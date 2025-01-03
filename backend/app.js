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
connect();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

const context = async ({ req, res }) => {
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const user = jwt.verify(token, ENV_VARS.JWT_SECRET_KEY);
      return { req, user: user };
    } catch (error) {
      console.error("Token verification failed: ", error);
    }
  }
  return { req };
};

const server = new ApolloServer({ typeDefs, resolvers });

const startServer = async () => {
  await server.start();
  app.use("/graphql", expressMiddleware(server, { context }));
  app.listen(ENV_VARS.PORT, () => {
    console.log(` Server ready at http://localhost:${ENV_VARS.PORT}/graphql`);
  });
};

startServer();
