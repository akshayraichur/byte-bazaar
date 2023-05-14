import { Container } from "@mui/material";
import { NavLink } from "react-router-dom";
// local imports
import ShoppingCartIcon from "../../assets/Icons/ShoppingCartIcon";
import WishListIcon from "../../assets/Icons/WishListIcon";
import ProfileIcon from "../../assets/Icons/ProfileIcon";

// Logo
import logo from "../../../icon.png";

import { StyledNavbar } from "./Navbar.styles";

const Navbar = () => {
  return (
    <StyledNavbar>
      <Container maxWidth="xl" className="nav-container">
        <NavLink to="/" className="logo-container">
          <img src={logo} alt="byte-bazaar-logo" />
          <h1 className="nav-title">Bytes</h1>
        </NavLink>
        <div className="search-container">
          <input type="text" placeholder="Search product.." className="search-input" />
        </div>
        <div className="icon-container">
          <NavLink to="/wishlist" className="icon">
            <WishListIcon />
          </NavLink>

          <NavLink to="/cart" className="icon">
            <ShoppingCartIcon />
          </NavLink>

          <NavLink to="/profile" className="icon">
            <ProfileIcon />
          </NavLink>
        </div>

        <div className="sm-search-container">
          <input type="text" placeholder="Search product.." className="search-input sm" />
        </div>
      </Container>
    </StyledNavbar>
  );
};

export default Navbar;
