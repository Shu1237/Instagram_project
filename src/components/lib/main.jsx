import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../lib/index.css";
import App from "../lib/App";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

//apollo client instance
const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
  credentials: "include", // include cookies in req
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </StrictMode>
);
