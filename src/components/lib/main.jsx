import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../lib/index.css";
import App from "../lib/App";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "../../graphql/graphql.config";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </StrictMode>
);
