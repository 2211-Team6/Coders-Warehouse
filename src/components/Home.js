import React, {useState} from "react";
import { Link } from "react-router-dom";
import Products from "./Products";
import SingleProduct from "./SingleProduct";

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
      {selectedProduct.id ? (
      <SingleProduct singleProduct={selectedProduct} setSelectedProduct={setSelectedProduct}/> 
      ) : (
        <Products selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct}/>)}
    </div>
  );
};

export default Home