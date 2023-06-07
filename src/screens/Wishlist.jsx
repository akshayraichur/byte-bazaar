import { Container, Grid, Skeleton } from "@mui/material";
import { useContext, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { UserContext } from "../store/UserContext";
import AuthError from "../Components/AuthError";
import ProductListingCard from "../Components/ProductListingCard/ProductListingCard";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { firebaseDB } from "../config/firebase";
import { toast } from "react-toastify";

const WishlistStyles = styled.div``;

const Wishlist = () => {
  const { user } = useContext(UserContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [wishlistData, setWishlistData] = useState([]);
  const [refreshpage, setRefreshPage] = useState(false);
  const [cartBtnLoading, setCartBtnLoading] = useState(false);
  const [removeBtnLoading, setRemoveBtnLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const selectedProductForCartRef = useRef(null);
  const selectedProductForRemove = useRef(null);

  const wishlistCollectionRef = collection(firebaseDB, "wishlist");

  const fetchWishlistDetails = async () => {
    setWishlistLoading(true);
    try {
      const response = await getDocs(wishlistCollectionRef);
      const data = response.docs.map((items) => ({ ...items.data(), id: items.id }));
      let filteredData = data.filter((p) => p.userId === user?.uid);

      setWishlistData(filteredData);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setWishlistLoading(false);
    }
  };

  const handleAddToCart = async (product) => {
    setCartBtnLoading(true);
    selectedProductForCartRef.current = product.productId;
    const cartRef = collection(firebaseDB, "cart");
    try {
      const response = await getDocs(cartRef);
      const data = response.docs.map((items) => ({ ...items.data(), id: items.id }));
      let findDoc = data.find((p) => p.productId === product.productId && user?.uid === p.userId);
      if (!findDoc) {
        // here, you have to add the doc to firebase
        await addDoc(cartRef, {
          productTitle: product.productTitle,
          productPricing: product.productPricing,
          productCategory: product.productCategory,
          productImg: product.productImg,
          userId: user?.uid,
          productRating: product.productRating,
          productQuantity: 1,
          productId: product.productId,
        });
        toast.success("Product added to cart");
      } else {
        // here, you have to update the firebase doc.
        const cartDoc = doc(firebaseDB, "cart", findDoc.id);
        await updateDoc(cartDoc, { productQuantity: findDoc.productQuantity + 1 });
        toast.success("Product quantity updated by 1");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setCartBtnLoading(false);
      selectedProductForCartRef.current = null;
    }
  };

  const deleteProductFromWishlist = async (product) => {
    setRemoveBtnLoading(true);
    selectedProductForRemove.current = product.productId;
    toast.info(`Removing ${product.productTitle}`);
    const wishlistDoc = doc(firebaseDB, "wishlist", product.id);
    try {
      await deleteDoc(wishlistDoc);
      toast.success(`Removed ${product.productTitle}`);
      setRefreshPage((p) => !p);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setRemoveBtnLoading(false);
      selectedProductForRemove.current = null;
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
  }, [refreshpage]);

  if (!isAuthenticated) {
    return (
      <Container maxWidth="xl">
        <WishlistStyles>
          <AuthError page="wishlist" />
        </WishlistStyles>
      </Container>
    );
  }

  if (wishlistLoading) {
    return (
      <Container maxWidth="md">
        <WishlistStyles>
          <Grid container>
            <Grid item xs={12} sm={12} md={12}>
              <Skeleton height={100} />
              <br />
              <Skeleton height={100} />
              <br />
              <Skeleton height={100} />
              <br />
            </Grid>
          </Grid>
        </WishlistStyles>
      </Container>
    );
  }

  if (!wishlistLoading && wishlistData.length === 0) {
    return (
      <Container maxWidth="md">
        <WishlistStyles>
          <center>
            <h2>No product in Wishlist</h2>
          </center>
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
                removeProduct={() => deleteProductFromWishlist(product)}
                addToCartBtnLoading={selectedProductForCartRef.current === product.productId && cartBtnLoading}
                addToWishlistBtbLoading={selectedProductForRemove.current === product.productId && removeBtnLoading}
              />
            ))}
          </Grid>
        </Grid>
      </WishlistStyles>
    </Container>
  );
};

export default Wishlist;
