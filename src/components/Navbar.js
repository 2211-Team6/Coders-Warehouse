import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "../style/Navbar.css";

const Navbar = ({ checkUserLoggedIn, setToken, user }) => {
  const navigate = useNavigate();
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
            class="button"
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
        <div className="navbar">
          <div class="button">
            <NavLink to="/" class="home">
              Home
            </NavLink>
          </div>
          <div class="button">
            <NavLink to="/login" class="text">
              Login
            </NavLink>
          </div>
          <div class="button">
            <NavLink to="/register" class="text">
              Register
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
        </div>
      )}
    </div>
  );
};

export default Navbar;
