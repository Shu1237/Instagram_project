import { ApolloClient, InMemoryCache, split, HttpLink } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";
import { getCookie } from "../utils/cookie.util";
import { createClient } from "graphql-ws";
const httpLink = new HttpLink({
  uri: "https://instagram-project-tbrg.onrender.com/graphql",
  credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  const token = getCookie();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://https://instagram-project-tbrg.onrender.com/graphql",
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
