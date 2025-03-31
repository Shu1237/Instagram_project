import express from "express";
import { connect } from "./config/database.config.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./graphql/typeDef.graphql.js";
import { resolvers } from "./graphql/resolver.graphql.js";
import ENV_VARS from "./config/envVars.config.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { redisService } from "./config/redis.config.js";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { useServer as setupWSConnection } from "graphql-ws/lib/use/ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { PubSub } from "graphql-subscriptions";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
import { userLoader } from "./utils/data_loader/user.data_loader.js";
import signaling from "./signaling.js";
// Connect to the database
connect();

const app = express();
const pubsub = new PubSub();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(graphqlUploadExpress({ maxFileSize: 100000000, maxFiles: 10 }));

// Create schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Create HTTP server
const httpServer = createServer(app);

// Signaling server setup
signaling(httpServer);

// WebSocket setup for GraphQL subscriptions
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

// Track active connections
const activeConnections = new Set();
const serverCleanup = setupWSConnection(
  {
    schema,
    context: async (ctx) => {
      const connectionId = Math.random().toString(36).slice(2);
      activeConnections.add(connectionId);
      ctx.connectionId = connectionId;
      return {
        pubsub,
        connectionId,
        userLoader,
      };
    },
    connectionInitWaitTimeout: 10000,
  },
  wsServer
);

// Apollo Server context
const context = async ({ req, res }) => {
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const user = jwt.verify(token, ENV_VARS.JWT_SECRET_KEY);
      return { req, user: user, cache: redisService, pubsub, userLoader };
    } catch (error) {
      console.error("Token verification failed: ", error);
    }
  }
  return { req, cache: redisService, pubsub, userLoader };
};

// Apollo Server setup
const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

// Start the server
const startServer = async () => {
  await redisService.connect();
  await server.start();
  app.use("/graphql", expressMiddleware(server, { context }));

  httpServer.listen(ENV_VARS.PORT, () => {
    console.log(
      `🚀 HTTP server ready at http://localhost:${ENV_VARS.PORT}/graphql`
    );
    console.log(
      `🚀 WebSocket server ready at ws://localhost:${ENV_VARS.PORT}/graphql`
    );
    console.log(`🚀 Socket.IO server ready at ws://localhost:${ENV_VARS.PORT}`);
  });
};

startServer();
