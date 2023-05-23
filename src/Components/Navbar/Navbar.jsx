import { Container } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
// local imports
import ShoppingCartIcon from "../../assets/Icons/ShoppingCartIcon";
import WishListIcon from "../../assets/Icons/WishListIcon";
import ProfileIcon from "../../assets/Icons/ProfileIcon";

// Logo
import logo from "../../../icon.png";

import { StyledNavbar } from "./Navbar.styles";
import LoginIcon from "../../assets/Icons/LoginIcon";
import { useContext } from "react";
import { UserContext } from "../../store/UserContext";
import LogoutIcon from "../../assets/Icons/Logout";
import { firebaseAuth } from "../../config/firebase";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    firebaseAuth.signOut();
    toast("Logged out!");
  };

  const handleSearch = (event) => {
    if (event.keyCode === 13) {
      if (event.target.value.trim()) {
        navigate(`/products?s=${event.target.value.trim()}`);
      }
    }
  };

  return (
    <StyledNavbar>
      <Container maxWidth="xl" className="nav-container">
        <NavLink to="/" className="logo-container">
          <img src={logo} alt="byte-bazaar-logo" />
          <h1 className="nav-title">Bytes</h1>
        </NavLink>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search product by name..."
            className="search-input"
            onKeyDown={handleSearch}
          />
        </div>
        <div className="icon-container">
          <NavLink to="/wishlist" className="icon" title="Whislist">
            <WishListIcon />
          </NavLink>

          <NavLink to="/cart" className="icon" title="Cart">
            <ShoppingCartIcon />
          </NavLink>

          <NavLink to="/profile" className="icon" title="Profile">
            <ProfileIcon />
          </NavLink>

          {!user.token ? (
            <NavLink to="/login" className="icon" title="Login">
              <LoginIcon />
            </NavLink>
          ) : (
            <span onClick={handleLogout} className="icon" title="Logout">
              <LogoutIcon />
            </span>
          )}
        </div>

        <div className="sm-search-container">
          <input
            type="text"
            placeholder="Search product by name.."
            className="search-input sm"
            onKeyDown={handleSearch}
          />
        </div>
      </Container>
    </StyledNavbar>
  );
};

export default Navbar;
