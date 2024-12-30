import express from "express";
import connect from "./config/database.config.js";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
connect();

const typeDefs = `#graphql 
  type Query {
    hello: String
  }
`;
const resolvers = {
  Query: {
    hello: () => "Hello World",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: {
    port: 4000,
  },
});
console.log(`Server ready at ${url}`);
