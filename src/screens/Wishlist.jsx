import { Container, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../store/UserContext";
import AuthError from "../Components/AuthError";
import ProductListingCard from "../Components/ProductListingCard/ProductListingCard";
import { collection, getDocs } from "firebase/firestore";
import { firebaseDB } from "../config/firebase";
import { toast } from "react-toastify";

const WishlistStyles = styled.div``;

const Wishlist = () => {
  const { user } = useContext(UserContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [wishlistData, setWishlistData] = useState([]);

  const wishlistCollectionRef = collection(firebaseDB, "wishlist");

  const fetchWishlistDetails = async () => {
    try {
      const response = await getDocs(wishlistCollectionRef);
      const data = response.docs.map((items) => ({ ...items.data(), id: items.id }));
      let filteredData = data.filter((p) => p.userId === user?.uid);

      setWishlistData(filteredData);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user?.token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user.token]);

  useEffect(() => {
    fetchWishlistDetails();
  }, []);

  if (!isAuthenticated) {
    return (
      <Container maxWidth="xl">
        <WishlistStyles>
          <AuthError page="wishlist" />
        </WishlistStyles>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <WishlistStyles>
        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            {wishlistData?.map((product) => (
              <ProductListingCard
                key={product.productId}
                title={product.productTitle}
                img={product.productImg}
                id={product.productId}
                price={product.productPricing}
                rating={product.productRating}
                page="wishlist"
                quantity={product.productQuantity}
                // removeProduct={() => deleteProductFromCart(product)}
                // handleIncrementProduct={() => handleIncrementProduct(product)}
                // handleDecrementProduct={() => handleDecrementProduct(product)}
              />
            ))}
          </Grid>

          {/* <Grid item xs={12} sm={5} md={3}>
            <div></div>
          </Grid> */}
        </Grid>
      </WishlistStyles>
    </Container>
  );
};

export default Wishlist;
