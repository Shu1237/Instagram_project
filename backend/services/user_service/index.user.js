import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { userIndexTypeDef } from "./typeDefs/index.typeDef.js";
import { userIndexResolver } from "./resolvers/index.resolver.js";

const schema = buildSubgraphSchema([
  { typeDefs: userIndexTypeDef, resolvers: userIndexResolver },
]);

const startUserServer = async () => {
  const server = new ApolloServer({ schema });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4001 },
  });
  console.log(`🚀 User server running at ${url}`);
};

export default startUserServer;
