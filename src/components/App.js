import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import { getAPIHealth } from "../axios-services";
import "../style/App.css";
import Register from "./Register.js";
import Login from "./Login.js";
import Cart from "./Cart"
import ReviewForm from "./ReviewForm";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [APIHealth, setAPIHealth] = useState("");

  useEffect(() => {
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? "api is up! :D" : "api is down :/");
    };
    getAPIStatus();
  }, []);

  return (
    <div className="app-container">
      <h1>Hello, World!</h1>
      <p>API Status: {APIHealth}</p>
      <Routes>
        <Route path="/" element={<Home token={token} setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/review-form" element={<ReviewForm />} />
        <Route path="/cart" element={<Cart/>} />
      </Routes>
    </div>
  );
};
export default App;