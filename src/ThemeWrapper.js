import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { indigo, pink } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      // indigo and pink play nicely together.
      light: indigo[300],
      main: indigo[500],
      dark: indigo[800],
    },
    secondary: {
      // This is pink as hex.
      light: pink[300],
      main: pink[500],
      dark: pink[800],
    },
    white: {
      main: "#ffffff",
    },
  },
});

export default function ThemeWrapper({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
