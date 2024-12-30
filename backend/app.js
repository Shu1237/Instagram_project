import express from "express";
import { connect } from "./config/database.config.js";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloGateway } from "@apollo/gateway";
import startUserServer from "./services/user_service/index.user.js";

connect();
startUserServer();

const gateway = new ApolloGateway({
  serviceList: [{ name: "user", url: "http://localhost:4001" }],
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
});

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`🚀 Gateway running at ${url}`);
};

startServer();
