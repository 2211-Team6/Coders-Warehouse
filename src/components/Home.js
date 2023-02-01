import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, NavLink } from "react-router-dom";
import Products from "./Products";
import SingleProduct from "./SingleProduct";
import Checkout from "./Checkout";
import cart from "./Cart";
import "../style/Home.css";
import { checkUserLoggedIn } from "./Login";
import { fetchMe } from "../api/auth";

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
  const navigate = useNavigate();

  useEffect(() => {
    const getMe = async () => {
      const token = localStorage.getItem("token");
      const data = await fetchMe(token);
      setUser(data);
    };
    if (token) {
      getMe();
    }
  }, [token]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
    <nav style={{ display: "block" }}>
      <header className="header">
        <Link to="/" className="logo">
          <div id="Buyitup">Buy It Up!</div>
        </Link>
        {checkUserLoggedIn() ? (
          <div>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/reviews">Product Reviews</NavLink>
            <NavLink to="/cart">Checkout</NavLink>
            <button
              type="button"
              className="header-button logout"
              onClick={() => {
                localStorage.removeItem("token");
                setToken(null);
                navigate("/login");
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/reviews">Product Reviews</NavLink>
            <NavLink to="/cart">Checkout</NavLink>
          </div>
        )}
      </header>
      <nav>
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
      </nav>
    </nav>
  </div>
  );
};

export default Home;
