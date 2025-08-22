import { ApolloClient, InMemoryCache, split, HttpLink } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";
import { getCookie } from "../utils/cookie.util";
import { createClient } from "graphql-ws";
import { onError } from "@apollo/client/link/error";

const httpLink = new HttpLink({
  uri: "https://shoponline.id.vn/graphql",
  credentials: "include",
  fetchOptions: {
    mode: "cors",
  },
});

const authLink = setContext((_, { headers }) => {
  const token = getCookie();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  };
});

// Error handling link
const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`);

      // If it's a fetch error, try to provide more context
      if (networkError.message === "Failed to fetch") {
        console.log("Network error details:", {
          operation: operation.operationName,
          variables: operation.variables,
        });
      }
    }
  }
);

const wsLink = new GraphQLWsLink(
  createClient({
    url: "wss://instagram-project-tbrg.onrender.com/graphql",
    connectionParams: () => {
      const token = getCookie();
      return {
        authorization: token ? `Bearer ${token}` : "",
      };
    },
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
  errorLink.concat(authLink.concat(httpLink))
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: "all",
    },
    query: {
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
});
