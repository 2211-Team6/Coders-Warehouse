import React, {useState} from "react";
import { Link } from "react-router-dom";
import Products from "./Products";
import SingleProduct from "./SingleProduct";
import Checkout from "./Checkout";
import cart from "./Cart";

const Home = ({token}) => {
  const [selectedProduct, setSelectedProduct] = useState({})

  return (
    <div>
      <Link to="/login">Log in!</Link>
      <br></br>
      <Link to="/register">
        Register!
      </Link>
      <br></br>
      <Link to="/cart"> Checkout here!</Link>
      <br></br>
      <Link to="/checkout"></Link>
      <br></br>
      {selectedProduct.id ? (
      <SingleProduct singleProduct={selectedProduct} setSelectedProduct={setSelectedProduct}/> 
      ) : (
        <Products selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct}/>)}
    </div>
  );
};

export default Home