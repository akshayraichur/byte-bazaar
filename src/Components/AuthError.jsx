import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button/Button";

const AuthErrorStyles = styled.div`
  height: 84vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media only screen and (width < 899px) {
    height: 78vh;
  }
`;

const AuthError = (props) => {
  const { page } = props;
  return (
    <AuthErrorStyles>
      {page === "profile" && <h2>Please login to your see amazing profile! </h2>}

      {page === "cart" && <h2>Please login to you account to see your cart!</h2>}

      {page === "wishlist" && <h2>Please login to your see your wishlist! </h2>}
      {page === "checkout" && <h2>Please login to checkout your products! </h2>}
      <br />
      <br />
      <NavLink to="/login" className="navlink">
        <Button variant="outlined" color="orange">
          Take me to Login page
        </Button>
      </NavLink>
    </AuthErrorStyles>
  );
};

AuthError.propTypes = {
  page: PropTypes.string.isRequired,
};

export default AuthError;
