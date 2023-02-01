import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import { addCartProduct, fetchMe, updateCartProduct } from "../api/auth";
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
  
  const addToCart = async (singleProduct) => {
    const exists = cartItems.find((product) => product.id === singleProduct.id)
    if(singleProduct.quantity > 0){
      console.log("Here's the quantity", singleProduct.quantity)
      if (exists){
        setCartItems(
          cartItems.map((product) =>  
          product.id === singleProduct.id ? { ...exists, quantity: exists.quantity + 1 } : product
          )
          );
          const id = user.id
          const productId = singleProduct.id
          const quantity = exists.quantity + 1
          console.log("This is update fields line 35", id, productId, quantity)
          const updatedProduct = await updateCartProduct(id, productId, quantity)
          console.log("This is the added product", updatedProduct)
        singleProduct.quantity -=1;
      } else {
        setCartItems([...cartItems, { ...singleProduct, quantity: 1}]);
        singleProduct.quantity -=1;
        const id = user.id
          const productId = singleProduct.id
          const quantity = 1
          const addedProduct = await addCartProduct(id, productId, quantity)
          console.log("Here's the added Product", addedProduct)
      }
    } else{
      alert("Out of stock")
    }
    };

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
    <div className="app-container">

      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser} token={token} setToken={setToken} reviews={reviews} setReviews={setReviews} cartItems={cartItems} setCartItems={setCartItems} addToCart={addToCart}/>} />
        <Route path="/register" element={<Register setUser={setUser} setToken={setToken}/>} />
        <Route path="/login" element={<Login setToken={setToken}/>} />
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
