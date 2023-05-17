import { Container } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../store/UserContext";
import styled from "styled-components";
import AuthError from "../Components/AuthError";

const CartDetailStyles = styled.div`
  padding: 1rem;
  margin: 1rem 0;
  border-radius: ${(props) => props.theme.borderRadius.card};
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  border: 1px solid ${(props) => props.theme.colors.containerColor};
`;

const CartDetails = () => {
  const { user } = useContext(UserContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (user?.token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user.token]);

  /**
   * For add to cart function
   * - the db should look like
   * - cart / <user-email> / details.
   */

  return (
    <>
      <Container maxWidth="xl">
        <CartDetailStyles>{isAuthenticated ? <h1>HI there</h1> : <AuthError page="cart" />}</CartDetailStyles>
      </Container>
    </>
  );
};

export default CartDetails;
