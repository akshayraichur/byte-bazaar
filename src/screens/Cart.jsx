/* eslint-disable no-unused-vars */
import { Container, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../store/UserContext";
import styled from "styled-components";
import AuthError from "../Components/AuthError";
import { collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { firebaseDB } from "../config/firebase";
import { toast } from "react-toastify";
import ProductListingCard from "../Components/ProductListingCard/ProductListingCard";
import Button from "../Components/Button/Button";
import { NavLink } from "react-router-dom";

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

  .price-breakup-container {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const CartDetails = () => {
  const { user, isAuthenticated } = useContext(UserContext);

  const [cartData, setCartData] = useState([]);
  const [addressData, setAddressData] = useState([]);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [refreshPage, setRefreshPage] = useState(false);

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

  const fetchAddressDetails = async () => {
    try {
      const addressRef = collection(firebaseDB, "address");
      const response = await getDocs(addressRef);
      const data = response.docs.map((item) => ({ ...item.data(), id: item.id }));
      let filteredData = data.filter((p) => p.userId === user?.uid);
      setAddressData(filteredData);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteProductFromCart = async (product) => {
    toast.info(`Removing ${product.productTitle}`);
    const cartDoc = doc(firebaseDB, "cart", product.id);
    try {
      await deleteDoc(cartDoc);
      toast.success(`Removed ${product.productTitle}`);
      setRefreshPage((p) => !p);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchCartDetails();
    fetchAddressDetails();
  }, [refreshPage]);

  const handleIncrementProduct = async (product) => {
    toast.info("Adding the quantity", {
      autoClose: 1000,
    });
    try {
      const cartDoc = doc(firebaseDB, "cart", product.id);
      await updateDoc(cartDoc, { productQuantity: product.productQuantity + 1 });
      toast.success("Quantity changed!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setRefreshPage((p) => !p);
    }
  };

  const handleDecrementProduct = async (product) => {
    if (Number(product.productQuantity) === 1) {
      toast.info("Please use remove button to cancel");
    } else {
      toast.info("Reducing the quantity", {
        autoClose: 1000,
      });
      try {
        const cartDoc = doc(firebaseDB, "cart", product.id);
        await updateDoc(cartDoc, { productQuantity: product.productQuantity - 1 });
        toast.success("Quantity changed!");
      } catch (error) {
        toast.error(error.message);
      } finally {
        setRefreshPage((p) => !p);
      }
    }
  };

  const handleAddCoupon = (e) => {
    if (e.keyCode === 13) {
      toast.info("We are bringing coupons very soon, stay tuned!");
      e.target.value = "";
    }
  };

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
            <Grid item xs={12} sm={7} md={9}>
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
                  removeProduct={() => deleteProductFromCart(product)}
                  handleIncrementProduct={() => handleIncrementProduct(product)}
                  handleDecrementProduct={() => handleDecrementProduct(product)}
                />
              ))}
            </Grid>
            <Grid item xs={12} sm={5} md={3}>
              <div className="cart-price">
                <h2>Cart Details</h2>
                <div className="price-breakup-container">
                  <p>Price</p>
                  <p>₹ {totalCartPrice.toLocaleString("en-IN")}/-</p>
                </div>

                <div className="price-breakup-container">
                  <p>Discount</p>
                  <p>₹ 0/-</p>
                </div>

                <hr style={{ margin: "1rem 0", border: "1px solid #e0e7ff" }} />
                <div className="price-breakup-container">
                  <p>Total</p>
                  <p>
                    <b>₹ {totalCartPrice.toLocaleString("en-IN")}/-</b>
                  </p>
                </div>

                <input className="input-container" type="text" placeholder="Add coupon" onKeyDown={handleAddCoupon} />

                <NavLink to="/checkout">
                  <Button fullWidth={true} variant="filled" color="orange">
                    Checkout
                  </Button>
                </NavLink>
              </div>
            </Grid>
          </Grid>
        </CartDetailStyles>
      </Container>
    </>
  );
};

export default CartDetails;
