import styled from "styled-components";
import { ButtonTransitionStyles } from "../../Utils/GlobalStyles";

export const StyledNavbar = styled.nav`
  color: ${(props) => props.theme.colors.background};
  background-color: ${(props) => props.theme.colors.containerBg};
  padding: 0.8rem 0;

  .nav-title {
    font-size: 1.4rem;
    letter-spacing: 2px;
    text-transform: capitalize;
  }

  .nav-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
  }

  .logo-container {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: white;
    text-decoration: none;

    img {
      height: 40px;
    }

    h1 {
      margin: 0.3rem 0 0 0;
    }
  }

  .search-container {
    display: flex;
    justify-content: center;
    width: 60%;

    @media only screen and (width < 799px) {
      display: none;
    }
  }

  .search-input {
    padding: 0.5rem 1rem;
    border-radius: ${(props) => props.theme.borderRadius.card};
    border: none;
    font-family: "Inter", sans-serif;
    width: 80%;
    font-size: 0.9rem;

    &:focus {
      outline: none;
    }
  }

  .search-input.sm {
    width: 100%;
  }

  .sm-search-container {
    display: none;
    justify-content: center;
    width: 100%;
    margin: 0.5rem 0;

    @media screen and (width <= 799px) {
      display: flex;
    }
  }

  .icon-container {
    display: flex;
    column-gap: 1.2rem;
    align-items: center;
  }

  .icon {
    cursor: pointer;
    background-color: inherit;
    border: none;
    color: white;
    ${ButtonTransitionStyles}
  }

  .icon,
  svg {
    height: 22px;
  }
`;
