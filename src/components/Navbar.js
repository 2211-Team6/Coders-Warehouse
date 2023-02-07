import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
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
  console.log("user", user);
  return (
    <div class="navbar">
      <NavLink to="/" className="logo"></NavLink>
      {checkUserLoggedIn() ? (
        <div className="navbar">
          <div class="button">
            <NavLink to="/" class="text">
              Home
            </NavLink>
          </div>
          <div class="button">
            <NavLink to="/reviews" class="text">
              Product Reviews
            </NavLink>
          </div>
          <div class="button">
            <NavLink to="/cart" class="text">
              <nav className="main-nav">
                <ul className="horizontal nav-list full-width">
                  <li>
                    <a href="">
                      <i className="material-icons">shopping_cart</i>
                    </a>
                  </li>
                </ul>
              </nav>
            </NavLink>
          </div>
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
          <NavLink to="/" class="home">
            Home
          </NavLink>
          <NavLink to="/login" class="text">
            Login
          </NavLink>

          <NavLink to="/register" class="text">
            Register
          </NavLink>

          <NavLink to="/reviews" class="text">
            Product Reviews
          </NavLink>

          <NavLink to="/cart" class="text">
            <nav className="main-nav">
              <ul className="horizontal nav-list full-width">
                <li>
                  <a href="">
                    <i className="material-icons">shopping_cart</i>
                  </a>
                </li>
              </ul>
            </nav>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Navbar;
