import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import { Link } from "react-router-dom";
import "../style/App.css";
import Register from "./Register.js";
import Login from "./Login.js";
import Cart from "./Cart";
import ReviewForm from "./ReviewForm";
import AllReviews from "./Reviews";
import Checkout from "./Checkout";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [APIHealth, setAPIHealth] = useState("");
  const [reviews, setReviews] = useState([])


  useEffect(() => {}, []);

  return (
    <div className="app-container">
      <Link to="/"><h1>Hello, World!</h1></Link>

      <Routes>
        <Route path="/" element={<Home token={token} setToken={setToken} reviews={reviews} setReviews={setReviews} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/review-form" element={<ReviewForm />} />
        <Route path="/reviews" element={<AllReviews reviews={reviews} setReviews={setReviews}/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/checkout" element={<Checkout/>} />
      </Routes>
    </div>
  );
};
export default App;
