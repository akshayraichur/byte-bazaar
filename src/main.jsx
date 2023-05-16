import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, Theme } from "./Utils/GlobalStyles.jsx";
import { BrowserRouter } from "react-router-dom";
import UserDetails from "./store/UserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserDetails>
        <ThemeProvider theme={Theme}>
          <GlobalStyles />
          <App />
        </ThemeProvider>
      </UserDetails>
    </BrowserRouter>
  </React.StrictMode>
);
