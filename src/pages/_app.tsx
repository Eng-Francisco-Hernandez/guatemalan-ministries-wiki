import "@/styles/globals.scss";
import "@/styles/main.scss";
import type { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const customTheme = createTheme({
  palette: {
    // mode: "dark",
    // primary: {
    //   main: "#000a41",
    //   light: "#4e73fe",
    //   dark: "#01114c",
    // },
    text: {
      primary: "#18669b",
      secondary: "#389ce0",
      disabled: "#bddef5",
    },
    // action: {
    //   disabledBackground: "#b8c7fe",
    //   disabled: "#f5f7ff",
    // },
  },
  typography: {
    fontFamily: `sans-serif, "Roboto", "Helvetica", "Arial"`,
    button: {
      textTransform: "none",
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={customTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
