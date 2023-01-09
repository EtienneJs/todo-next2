// import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material/styles";
// import { ThemeProvider as Emotion10ThemeProvider } from 'emotion-theming';
import CssBaseline from "@mui/material/CssBaseline";
import { darkTheme, ligtTheme } from "../themes";
import { UIProvider } from "../context/ui";
import { EntriesProvider } from "../context/entries";
import { SnackbarProvider } from "notistack";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider maxSnack={3}>
      <EntriesProvider>
        <UIProvider>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UIProvider>
      </EntriesProvider>
    </SnackbarProvider>
  );
}
