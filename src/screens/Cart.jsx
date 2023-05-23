/* eslint-disable no-unused-vars */
import { Container, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../store/UserContext";
import styled from "styled-components";
import AuthError from "../Components/AuthError";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { firebaseDB } from "../config/firebase";
import { toast } from "react-toastify";
import ProductListingCard from "../Components/ProductListingCard/ProductListingCard";

const CartDetailStyles = styled.div`
  padding: 1rem;
  margin: 1rem 0;
  border-radius: ${(props) => props.theme.borderRadius.card};
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  border: 1px solid ${(props) => props.theme.colors.containerColor};

  .cart-price {
    padding: 1rem;
    /* box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); */
    border-radius: ${(props) => props.theme.borderRadius.card};
    border: 1px solid ${(props) => props.theme.colors.containerColor};
  }
`;

const CartDetails = () => {
  const { user, isAuthenticated } = useContext(UserContext);

  const [cartData, setCartData] = useState([]);
  const [totalCartPrice, setTotalCartPrice] = useState(0);

  const cartCollectionRef = collection(firebaseDB, "cart");

  const fetchCartDetails = async () => {
    try {
      const response = await getDocs(cartCollectionRef);
      const data = response.docs.map((items) => ({ ...items.data(), id: items.id }));
      let filteredData = data.filter((p) => p.userId === user?.uid);

      setTotalCartPrice(filteredData.reduce((acc, curr) => (acc += curr.productQuantity * curr.productPricing), 0));

      setCartData(filteredData);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteProductFromCart = async (cartDetails) => {
    const cartDoc = doc(firebaseDB, "cart", cartDetails.id);
    // doc()
    try {
      await deleteDoc(cartDoc);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchCartDetails();
  }, []);

  /**
   * For add to cart function
   * - the db should look like
   * - cart / <user-email> / details.
   */

  if (!isAuthenticated) {
    return (
      <Container maxWidth="xl">
        <CartDetailStyles>
          <AuthError page="cart" />
        </CartDetailStyles>
      </Container>
    );
  }

  return (
    <>
      <Container maxWidth="xl">
        <CartDetailStyles>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={7} md={8}>
              {cartData?.map((product) => (
                <ProductListingCard
                  key={product.productId}
                  title={product.productTitle}
                  img={product.productImg}
                  id={product.productId}
                  price={product.productPricing}
                  rating={product.productRating}
                  page="cart"
                  quantity={product.productQuantity}
                />
              ))}
            </Grid>
            <Grid item xs={12} sm={5} md={4}>
              <div className="cart-price">
                <h2>Cart Details</h2>
                <h2>Total Cart Value {totalCartPrice.toLocaleString("en-us")}/-</h2>
              </div>
            </Grid>
          </Grid>
        </CartDetailStyles>
      </Container>
    </>
  );
};

export default CartDetails;
