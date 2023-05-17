import { Container } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../store/UserContext";
import AuthError from "../Components/AuthError";

const WishlistStyles = styled.div``;

const Wishlist = () => {
  const { user } = useContext(UserContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (user?.token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user.token]);

  return (
    <Container maxWidth="xl">
      <WishlistStyles>{isAuthenticated ? <></> : <AuthError page="wishlist" />}</WishlistStyles>
    </Container>
  );
};

export default Wishlist;
