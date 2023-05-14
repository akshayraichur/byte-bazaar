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
        <div>
          <input type="text" />
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
      </Container>
    </StyledNavbar>
  );
};

export default Navbar;
