import React from 'react';
import { useReducer } from 'react';
import { Link, useNavigate } from "react-router-dom";
import ProductReview from './ProductReview';
import ReviewForm from './ReviewForm';
import { useState, useEffect } from 'react';
import { fetchMe } from '../api/auth';
import EditProduct from './Admin_Functions/EditProduct';
import "../style/SingleProduct.css"

const SingleProduct = ({singleProduct, setSelectedProduct, reviews, setCartItems, cartItems, addToCart, checkUserLoggedIn}) => {
  const navigate = useNavigate();
  const [me, setMe] = useState({})

  useEffect(() => {
    const getMe = async () => {
      const token = localStorage.getItem("token");
      const data = await fetchMe(token);
      console.log("here is your data", data)
      setMe(data);
    };
      getMe();
      console.log("Here's the user", me)
  }, []);

    return (
      <div>
            {checkUserLoggedIn() ? me.isAdmin ? (<EditProduct singleProduct={singleProduct}/>) : (
        <div>
        <div class="single-product-container">
          <div>
            <img src={singleProduct.url}/>
          </div>
          <div class="product">
            <h1>{singleProduct.title}</h1>
            <h2>Price: ${singleProduct.price}</h2>
            <p class="description">Description: {singleProduct.description}</p>
            <p class='quantity'>Quantity: {singleProduct.quantity}</p>
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
        </div>) :(
        <div>
        <div class="single-product-container">
          <div>
            <img src={singleProduct.url}/>
          </div>
          <div class="product">
            <h1>{singleProduct.title}</h1>
            <h2>Price: ${singleProduct.price}</h2>
            <p class="description">Description: {singleProduct.description}</p>
            <p class='quantity'>Quantity: {singleProduct.quantity}</p>
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
        </div>) }
      </div>
      );
};

export default SingleProduct;