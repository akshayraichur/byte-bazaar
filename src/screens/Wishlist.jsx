import { Container, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../store/UserContext";
import AuthError from "../Components/AuthError";
import ProductListingCard from "../Components/ProductListingCard/ProductListingCard";
import { addDoc, collection, doc, getDocs, updateDoc } from "firebase/firestore";
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

  const handleAddToCart = async (product) => {
    const cartRef = collection(firebaseDB, "cart");
    try {
      const response = await getDocs(cartRef);
      const data = response.docs.map((items) => ({ ...items.data(), id: items.id }));
      let findDoc = data.find((p) => p.productId === product.id && user?.uid === p.userId);
      if (!findDoc) {
        // here, you have to add the doc to firebase
        await addDoc(cartRef, {
          productTitle: product.title,
          productPricing: product.price,
          productCategory: product.category,
          productImg: product.img,
          userId: user?.uid,
          productRating: product.rating,
          productQuantity: 1,
          productId: product.id,
        });
        toast.success("Product added to cart");
      } else {
        // here, you have to update the firebase doc.
        const cartDoc = doc(firebaseDB, "cart", findDoc.id);
        await updateDoc(cartDoc, { productQuantity: findDoc.productQuantity + 1 });
        toast.success("Product added to cart");
      }
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
                handleCartUpdate={() => handleAddToCart(product)}
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
