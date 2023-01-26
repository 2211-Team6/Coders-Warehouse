import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";

import "../style/App.css";
import Register from "./Register.js";
import Login from "./Login.js";
import Cart from "./Cart";
import ReviewForm from "./ReviewForm";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {}, []);

  return (
    <div className="app-container">
      <h1>Hello, World!</h1>

      <Routes>
        <Route path="/" element={<Home token={token} setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/review-form" element={<ReviewForm />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
};
export default App;
