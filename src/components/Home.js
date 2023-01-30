import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import Products from "./Products";
import SingleProduct from "./SingleProduct";
import Checkout from "./Checkout";
import cart from "./Cart";
import "../style/Home.css"

const Home = ({token, reviews, setReviews, cartItems, setCartItems, addToCart}) => {
  const [selectedProduct, setSelectedProduct] = useState({})
  return (
    <div style={{display: "flex", flexDirection: "column"}}>
       <nav style={{display: "block"}}>

      <NavLink to="/login">Log in!</NavLink>
      <br></br>
      <NavLink to="/register">
        Register!
      </NavLink>
      <br></br>
      <NavLink to="/reviews">Product Reviews</NavLink>
      <br></br>
      <NavLink to="/cart"> Checkout here!</NavLink>
      <br></br>
      <NavLink to="/checkout"></NavLink>
      <br></br>
      <nav>
      {selectedProduct.id ? (
        <SingleProduct 
      singleProduct={selectedProduct} 
      setSelectedProduct={setSelectedProduct} 
      cartItems={cartItems}
      setCartItems={setCartItems}
      addToCart={addToCart}
      reviews={reviews} 
      setReviews={setReviews}/> 
      ) : (
        <Products 
        selectedProduct={selectedProduct} 
        setSelectedProduct={setSelectedProduct} 
        reviews={reviews} 
        setReviews={setReviews} 
        cartItems={cartItems}
        setCartItems={setCartItems}
        addToCart={addToCart} />)}
        </nav>
        </nav>
    </div>
  );
};

export default Home