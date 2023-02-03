import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, NavLink } from "react-router-dom";
import Products from "./Products";
import SingleProduct from "./SingleProduct";
import Checkout from "./Checkout";
import cart from "./Cart";
import "../style/Home.css";
import { checkUserLoggedIn } from "./Login";
import { fetchMe } from "../api/auth";
// import Navbar from "./Navbar";

const Home = ({
  token,
  setToken,
  reviews,
  setReviews,
  cartItems,
  setCartItems,
  addToCart,
  user,
  setUser,
}) => {
  const [selectedProduct, setSelectedProduct] = useState({});
  const location = useLocation();
  const navigate = useNavigate()

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
        <h1>Hello, {user?.username}!</h1>
        {selectedProduct.id ? (
          <SingleProduct
            singleProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            cartItems={cartItems}
            setCartItems={setCartItems}
            addToCart={addToCart}
            reviews={reviews}
            setReviews={setReviews}
          />
        ) : (
          <Products
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            reviews={reviews}
            setReviews={setReviews}
            cartItems={cartItems}
            setCartItems={setCartItems}
            addToCart={addToCart}
          />
        )}

  </div>
  );
};

export default Home;
