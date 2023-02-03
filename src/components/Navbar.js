import React, { useEffect, useState} from "react";
import { NavLink, useLocation, useNavigate, Link } from "react-router-dom";
import Products from "./Products";
import SingleProduct from "./SingleProduct";
import { checkUserLoggedIn } from "./Login";
import { fetchMe } from "../api/auth";
import Register from "./Register.js";
import Login from "./Login.js";
import Cart from "./Cart";
import ReviewForm from "./ReviewForm";
import AllReviews from "./Reviews";
import Checkout from "./Checkout";
import "../style/Navbar.css";


const Navbar = ({ checkUserLoggedIn, setToken, user }) => {
    
  return (
    <div class="navbar">

  
      <Link to="/" className="logo">
      </Link>
      {checkUserLoggedIn() ? (
        <div className="navbar">
          <NavLink to="/" class= "home">Home</NavLink>
          <NavLink to="/reviews" class="a">Product Reviews</NavLink>
          <NavLink to="/cart" class= "a" >Checkout</NavLink>
          <button
            type="button"
            className="header-button logout"
            onClick={() => {
              localStorage.removeItem("token");
              setToken(null);
            }}
            >
            Logout
          </button>
        </div>
      ) : (
        <div className="navbar">
          <NavLink to="/" class="home">Home</NavLink>
          <NavLink to="/login" class="a">Login</NavLink>
          <NavLink to="/register" class="a">Register</NavLink>
          <NavLink to="/reviews" class="a">Product Reviews</NavLink>
          <NavLink to="/cart" class="a">Checkout</NavLink>
        </div>
        
        )}
   
        </div>
  );
};

export default Navbar;