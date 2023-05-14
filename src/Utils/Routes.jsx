import { Route, Routes } from "react-router-dom";
import Home from "../screens/Home";

import ProductDetails from "../screens/ProductDetails";
import CartDetails from "../screens/Cart";
import Wishlist from "../screens/Wishlist";
import Profile from "../screens/Profile";

const RouteDetails = () => (
  <Routes>
    <Route path="/" element={<Home />}></Route>
    <Route path="/products" element={<ProductDetails />}></Route>
    <Route path="/cart" element={<CartDetails />}></Route>
    <Route path="/wishlist" element={<Wishlist />}></Route>
    <Route path="/profile" element={<Profile />}></Route>
  </Routes>
);

export default RouteDetails;
