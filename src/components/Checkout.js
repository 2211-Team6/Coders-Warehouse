import React, { useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import { fetchCheckout, calculateTotalPrice } from "../api/auth";
import '../style/Checkout.css';
import OrderSummary from "./OrderSummary";

const Checkout = ({cartItems}) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
    const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchCheckout(name, address, city, state, zip)
      .then((response) => {
        if (response) {
          alert("Your Order Has Been Placed!");
          setCartPurchases([]);
          navigate("/order-summary");
        } else {
          alert(
            "There was an issue processing your order. Please try again later"
          );
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <h1>Checkout</h1>
      <form>
        <h2>Shipping Information</h2>
        <label>Full Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Address:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <label>City:</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <label>State:</label>
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <label>Zip Code:</label>
        <input
          type="text"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />
        <button onClick={() => navigate("/order-summary")}>Place Order</button>
      </form>
    </div>
  );
};
export default Checkout;


