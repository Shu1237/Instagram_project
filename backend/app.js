import express from "express";
import { connect } from "./config/database.config.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./graphql/typeDef.graphql.js";
import { resolvers } from "./graphql/resolver.graphql.js";
import ENV_VARS from "./config/envVars.config.js";
import cors from "cors";
import cookieParser from "cookie-parser";

connect();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});

const startServer = async () => {
  await server.start();
  app.use("/graphql", expressMiddleware(server));

  app.listen(ENV_VARS.PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${ENV_VARS.PORT}/graphql`);
  });
};

startServer();
