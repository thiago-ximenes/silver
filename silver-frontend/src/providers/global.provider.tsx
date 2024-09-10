import { PropsWithChildren } from "react";
import { AuthProvider } from "./auth.provider.tsx";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { ApolloProvider } from "./apollo.provider.tsx";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { ptBR } from "@mui/x-date-pickers/locales";
import ptBrLocale from "date-fns/locale/pt-BR";

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
        <AuthProvider>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            localeText={
              ptBR.components.MuiLocalizationProvider.defaultProps.localeText
            }
            adapterLocale={ptBrLocale}
          >
            {props.children}
          </LocalizationProvider>
        </AuthProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
}
