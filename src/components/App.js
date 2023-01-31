import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import { fetchMe } from "../api/auth";
import { Link } from "react-router-dom";
import "../style/App.css";
import Register from "./Register.js";
import Login from "./Login.js";
import Cart from "./Cart";
import ReviewForm from "./ReviewForm";
import AllReviews from "./Reviews";
import Checkout from "./Checkout";
import SingleProduct from "./SingleProduct";
import Products from "./Products";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [reviews, setReviews] = useState([])
  const [user, setUser] = useState({})
  const [cartItems, setCartItems] = useState([])
  
  const addToCart = (singleProduct) => {
    const exists = cartItems.find((product) => product.id === singleProduct.id)
    if(singleProduct.quantity > 0){
      console.log("Here's the quantity", singleProduct.quantity)
      if (exists){
        setCartItems(
          cartItems.map((product) =>  
          product.id === singleProduct.id ? { ...exists, quantity: exists.quantity + 1 } : product
        )
        );
        singleProduct.quantity -=1;
      } else {
        setCartItems([...cartItems, { ...singleProduct, quantity: 1}]);
        singleProduct.quantity -=1;
      }
    } else{
      alert("Out of stock")
    }
    };


  return (
    <div className="app-container">

      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser} token={token} setToken={setToken} reviews={reviews} setReviews={setReviews} cartItems={cartItems} setCartItems={setCartItems} addToCart={addToCart}/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/review-form" element={<ReviewForm user={user}/>} />
        <Route path="/reviews" element={<AllReviews reviews={reviews} setReviews={setReviews}/>} />
        <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} addToCart={addToCart} user={user}/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </div>
  );
};
export default App;
