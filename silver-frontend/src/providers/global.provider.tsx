import { PropsWithChildren } from "react";
import { AuthProvider } from "./auth.provider.tsx";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { ApolloProvider } from "./apollo.provider.tsx";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export function GlobalProvider(props: PropsWithChildren) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ApolloProvider>
        <AuthProvider>{props.children}</AuthProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
}
