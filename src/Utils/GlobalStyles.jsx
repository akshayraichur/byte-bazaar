import { createGlobalStyle } from "styled-components";

import californiaParadise from "../assets/fonts/california-paradise.ttf";

export const Theme = {
  colors: {
    background: "#fff",
    text: "#0c4a6e",
    border: "#0284c7",
    btnBgColor: "#0c4a6e",
  },
  borderRadius: {
    card: "8px",
    btn: "5px",
  },
};

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  @font-face {
    font-family: 'california';
    src: url(${californiaParadise}) format('truetype');
  }

  body {
    font-family: "california", "Inter", sans-serif;
    color: ${(props) => props.theme.colors.text};
    background-color: ${(props) => props.theme.colors.background};
  }

  ::selection{
    background-color: ${(props) => props.theme.colors.text};
    color: ${(props) => props.theme.colors.background}
  }

`;
