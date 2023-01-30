import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import ProductReview from './ProductReview';
import ReviewForm from './ReviewForm';

const SingleProduct = ({singleProduct, setSelectedProduct, reviews, setCartItems, cartItems, addToCart}) => {
  const navigate = useNavigate();
  console.log("This is cart items in singleProduct", cartItems)
  
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
            <button onClick={() => addToCart(singleProduct)}> Add to Cart</button>
            <button onClick={() => setSelectedProduct({})}>View all products</button>
          </div>
        </div>
        <br></br>
        <br></br>
        <div class="single-review">
          {reviews.length > 0 ? 
          (<ProductReview reviews={reviews} singleProduct={singleProduct}/>
            ) : 
            (<div>
            <p>There are no Reviews</p>
            <p><em>Be the first to leave a Review</em></p>
            <ReviewForm singleProduct={singleProduct}/>
            </div>)
            }
        </div>
      </div>
      );
};

export default SingleProduct;