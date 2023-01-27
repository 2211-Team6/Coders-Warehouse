import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import ProductReview from './ProductReview';

const SingleProduct = ({singleProduct, setSelectedProduct, reviews}) => {
  const navigate = useNavigate();
    return (
      <div>
        <div class="single-product-container">
          <div>
            <img src={singleProduct.url}/>
          </div>
          <div>
            <h3>{singleProduct.title}</h3>
            <p>Description: {singleProduct.description}</p>
            <p>Price: ${singleProduct.price/100}</p>
            <p>Quantity: {singleProduct.quantity}</p>
            <button onClick={() => setSelectedProduct({})}>View all products</button>
            <button onClick={() => navigate("/review-form")}>Leave A Review</button>
          </div>
        </div>
        <br></br>
        <br></br>
        <div class="single-review">
          {console.log("Here are the reviews", reviews)}
          {reviews.length > 0 ? 
          (<ProductReview reviews={reviews}/>
            ) : 
            <p>"There are no Reviews"</p>}
        </div>
      </div>
      );
};

export default SingleProduct;