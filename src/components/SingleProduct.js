import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import ProductReview from './ProductReview';
import ReviewForm from './ReviewForm';
import "../style/SingleProduct.css"

const SingleProduct = ({singleProduct, setSelectedProduct, reviews, setCartItems, cartItems, addToCart}) => {
  const navigate = useNavigate();
  console.log("This is cart items in singleProduct", cartItems)

  const handleSizeClick = (event) => {
    $(event.target).toggleClass('focus').siblings().removeClass('focus');
  }
  
    return (
      <div>
        <div class="single-product-container">
          <div>
            <img src={singleProduct.url}/>
          </div>
          <div class="product">
            <h1>{singleProduct.title}</h1>
            <h2>Price: ${singleProduct.price/100}</h2>
            <p class="description">Description: {singleProduct.description}</p>
            <p>Quantity: {singleProduct.quantity}</p>
            <div class="buttons">
            <button class="add" onClick={() => addToCart(singleProduct)}> Add to Cart</button>
            <br></br>
            <button class="all" onClick={() => setSelectedProduct({})}>View all products</button>
            </div>
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