import React, {useState} from "react";
import { Link } from "react-router-dom";
import Products from "./Products";
import SingleProduct from "./SingleProduct";

const Home = ({token, reviews, setReviews}) => {
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
      {selectedProduct.id ? (
      <SingleProduct singleProduct={selectedProduct} setSelectedProduct={setSelectedProduct} reviews={reviews} setReviews={setReviews}/> 
      ) : (
        <Products selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} reviews={reviews} setReviews={setReviews} />)}
    </div>
  );
};

export default Home