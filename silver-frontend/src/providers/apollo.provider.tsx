import { PropsWithChildren } from "react";
import { ApolloProvider as AProvider } from "@apollo/client";
import { client } from "../libs/apollo.client.tsx";

export function ApolloProvider(props: PropsWithChildren) {
  return <AProvider client={client}>{props.children}</AProvider>;
}
