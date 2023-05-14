import { createGlobalStyle, css } from "styled-components";

const deepColor = "#4f46e5";
const borderColor = "#a5b4fc";
const orange = "#f97316";
const green = "#22c55e";
const containerColor = "#e0e7ff";

export const Theme = {
  colors: {
    background: "#fff",
    text: deepColor,
    border: borderColor,
    btnBgColor: deepColor,
    containerBg: deepColor,
    borderHoverColor: deepColor,
    containerColor,
    green,
    orange,
  },
  borderRadius: {
    card: "8px",
    btn: "5px",
  },
};

export const ButtonTransitionStyles = css`
  transition: all 0.3s ease;
  &:active {
    transform: scale(0.9);
  }
`;

export const FadeInAnimation = css`
  animation: fadein 0.5s ease;

  @keyframes fadein {
    0% {
      opacity: 0;
      transform: translateY(20%);
    }

    100% {
      opacity: 1;
      transform: translateY(0%);
    }
  }
`;

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: "Inter", sans-serif, 'Lora', serif;
    color: ${(props) => props.theme.colors.text};
    background-color: ${(props) => props.theme.colors.background};
  }

  h1 {
    font-family: 'Lora', serif;
    letter-spacing: 5px;
    font-size: 2.5rem;
    text-transform: uppercase;
    margin: 0.4rem 0;

    @media screen and (width < 599px) {
      font-size: 1.6rem;
    }
  }

  ::selection{
    background-color: ${(props) => props.theme.colors.text};
    color: ${(props) => props.theme.colors.background}
  }

`;
