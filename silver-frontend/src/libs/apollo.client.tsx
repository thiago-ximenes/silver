import { ApolloClient, InMemoryCache } from "@apollo/client";
import { apiConfig } from "../config/api.config.ts";

export const client = new ApolloClient({
  uri: apiConfig.baseUrl,
  cache: new InMemoryCache(),
});
