import styled, { css } from "styled-components";
import { ButtonTransitionStyles } from "../../Utils/GlobalStyles";

export const StyledButton = styled.button`
  padding: 0.8rem 1.4rem;
  margin: 1rem 0;
  cursor: pointer;
  color: white;
  font-size: 0.85rem;
  font-family: "Inter";

  border-radius: ${(props) => props.theme.borderRadius.btn};
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

  ${ButtonTransitionStyles}

  /* media queries */
  @media screen and (width <= 599px) {
    width: 100%;
    margin: 0.5rem 0;
  }

  /* Styling according to props */

  ${(props) =>
    props.variant === "filled" &&
    css`
      color: white;
      background-color: ${(props) => props.theme.colors.btnBgColor};
      border: 2px solid ${(props) => props.theme.colors.btnBgColor};
    `}

  ${(props) =>
    props.variant === "outlined" &&
    css`
      background-color: inherit;
      border: 2px solid ${(props) => props.theme.colors.btnBgColor};
      color: ${(props) => props.theme.colors.text};
    `}

    /* Green Button Styles */
  ${(props) =>
    props.color === "green" &&
    props.variant === "outlined" &&
    css`
      background-color: inherit;
      border: 2px solid ${(props) => props.theme.colors.green};
      color: ${(props) => props.theme.colors.green};
    `}

    ${(props) =>
    props.color === "green" &&
    props.variant === "filled" &&
    css`
      background-color: ${(props) => props.theme.colors.green};
      border: 2px solid ${(props) => props.theme.colors.green};
      color: white;
    `}

    /* Orange button styles */
    ${(props) =>
    props.color === "orange" &&
    props.variant === "outlined" &&
    css`
      background-color: inherit;
      border: 2px solid ${(props) => props.theme.colors.orange};
      color: ${(props) => props.theme.colors.orange};
    `}

    ${(props) =>
    props.color === "orange" &&
    props.variant === "filled" &&
    css`
      background-color: ${(props) => props.theme.colors.orange};
      border: 2px solid ${(props) => props.theme.colors.orange};
      color: white;
    `}
`;
