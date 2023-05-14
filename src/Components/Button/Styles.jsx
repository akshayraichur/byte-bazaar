import styled, { css } from "styled-components";

export const StyledButton = styled.button`
  padding: 0.8rem 1.4rem;
  margin: 1rem 0.5rem 1rem 0;
  cursor: pointer;
  color: white;
  font-size: 0.85rem;
  font-family: "Inter";
  transition: all 0.2s ease;
  border-radius: ${(props) => props.theme.borderRadius.btn};
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

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

  &:active {
    transform: scale(0.9);
  }
`;
