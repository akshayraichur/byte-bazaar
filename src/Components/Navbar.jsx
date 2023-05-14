import { Container } from "@mui/material";
import styled from "styled-components";
import ShoppingCartIcon from "../assets/Icons/ShoppingCartIcon";
import { ButtonTransitionStyles } from "../Utils/GlobalStyles";
import WishListIcon from "../assets/Icons/WishListIcon";
import ProfileIcon from "../assets/Icons/ProfileIcon";

const StyledNavbar = styled.nav`
  color: ${(props) => props.theme.colors.background};
  background-color: ${(props) => props.theme.colors.containerBg};
  padding: 0.8rem 0;

  .nav-title {
    font-size: 1.4rem;
    letter-spacing: 2px;
  }

  .nav-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
  }

  .search-container {
    display: flex;
    justify-content: center;
    width: 60%;

    @media screen and (width <= 799px) {
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

const Navbar = () => {
  return (
    <StyledNavbar>
      <Container maxWidth="xl" className="nav-container">
        <div>
          <h1 className="nav-title">Byte Bazaar</h1>
        </div>
        <div className="search-container">
          <input type="text" placeholder="Search product.." className="search-input" />
        </div>
        <div className="icon-container">
          <button className="icon">
            <WishListIcon />
          </button>
          <button className="icon">
            <ShoppingCartIcon />
          </button>
          <button className="icon">
            <ProfileIcon />
          </button>
        </div>

        <div className="sm-search-container">
          <input type="text" placeholder="Search product.." className="search-input sm" />
        </div>
      </Container>
    </StyledNavbar>
  );
};

export default Navbar;
