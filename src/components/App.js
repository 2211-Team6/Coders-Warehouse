import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import { fetchMe } from "../api/auth";
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
  const [user, setUser] = useState({})


  useEffect(() => {
    const getMe = async () => {
      const token = localStorage.getItem("token");
      console.log("This is token", token);
      const data = await fetchMe(token);
      console.log("This is data", data);
      setUser(data);
      console.log("This is user line 30", user);
    };
    if (token) {
      getMe();
    }
  }, [token]);

  return (
    <div className="app-container">
      <h1>Hello, {user?.username}!</h1>

      <Routes>
        <Route path="/" element={<Home token={token} setToken={setToken} reviews={reviews} setReviews={setReviews} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/review-form" element={<ReviewForm user={user}/>} />
        <Route path="/reviews" element={<AllReviews reviews={reviews} setReviews={setReviews}/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/checkout" element={<Checkout/>} />
      </Routes>
    </div>
  );
};
export default App;
