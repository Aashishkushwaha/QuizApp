import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ThemeProvider from "./ThemeWrapper";
import { SnackbarProvider } from "notistack";
import { BrowserRouter as Router } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

// design -
// https://www.figma.com/proto/Ot1LSXFLzYp4A5qDdYaGdM/Quizapp?node-id=1%3A2&viewport=226%2C61%2C0.5380759239196777&scaling=min-zoom

ReactDOM.render(
  <Router>
    <ThemeProvider>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <App />
      </SnackbarProvider>
    </ThemeProvider>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
