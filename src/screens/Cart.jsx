import { Container } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../store/UserContext";
import styled from "styled-components";
import AuthError from "../Components/AuthError";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { firebaseAuth, firebaseDB } from "../config/firebase";
import { toast } from "react-toastify";
import ProductListingCard from "../Components/ProductListingCard/ProductListingCard";

const CartDetailStyles = styled.div`
  padding: 1rem;
  margin: 1rem 0;
  border-radius: ${(props) => props.theme.borderRadius.card};
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  border: 1px solid ${(props) => props.theme.colors.containerColor};
`;

const CartDetails = () => {
  const { user, isAuthenticated } = useContext(UserContext);

  const [cartData, setCartData] = useState([]);

  const cartCollectionRef = collection(firebaseDB, "cart");
  console.log(firebaseAuth.currentUser);
  const fetchCartDetails = async () => {
    try {
      const response = await getDocs(cartCollectionRef);
      const data = response.docs.map((items) => ({ ...items.data(), id: items.id }));
      let filteredData = data.filter((p) => p.userId === user?.uid);
      console.log(user?.uid);
      console.log(data);
      console.log(filteredData);
      setCartData(filteredData);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  console.log(cartData);

  const deleteProductFromCart = async (cartDetails) => {
    const cartDoc = doc(firebaseDB, "cart", cartDetails.id);
    // doc()
    await deleteDoc(cartDoc);
  };

  useEffect(() => {
    fetchCartDetails();
  }, []);

  /**
   * For add to cart function
   * - the db should look like
   * - cart / <user-email> / details.
   */

  const cartDetails = (
    <div>
      {cartData?.map((product) => (
        <ProductListingCard
          key={product.productId}
          title={product.productTitle}
          img={product.productImg}
          id={product.productId}
          price={product.productPricing}
          rating={product.productRating}
          // handleCartUpdate={() => handleCartUpdate(product)}
          // handleWishlistUpdate={() => handleWishlistUpdate(product)}
          // addToCartBtnLoading={selectedProductForCartRef.current === product.id && addToCartBtnLoading}
          // addToWishlistBtbLoading={selectedProductForWishlist.current === product.id && addToWishlistBtnLoading}
          page="cart"
        />
      ))}
    </div>
  );

  return (
    <>
      <Container maxWidth="md">
        <CartDetailStyles>{isAuthenticated ? <div>{cartDetails}</div> : <AuthError page="cart" />}</CartDetailStyles>
      </Container>
    </>
  );
};

export default CartDetails;
