import React, {useState} from "react";
import { Link } from "react-router-dom";
import Products from "./Products";
import SingleProduct from "./SingleProduct";
import Checkout from "./Checkout";
import cart from "./Cart";

const Home = ({token, reviews, setReviews, cartItems, setCartItems, addToCart}) => {
  const [selectedProduct, setSelectedProduct] = useState({})
  return (
    <div>
      <Link to="/login">Log in!</Link>
      <br></br>
      <Link to="/register">
        Register!
      </Link>
      <br></br>
      <Link to="/reviews">Product Reviews</Link>
      <br></br>
      <Link to="/cart"> Checkout here!</Link>
      <br></br>
      <Link to="/checkout"></Link>
      <br></br>
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
    </div>
  );
};

export default Home