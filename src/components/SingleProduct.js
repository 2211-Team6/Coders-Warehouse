import React from 'react';
import { Link } from 'react-router-dom';
import ReviewForm from './ReviewForm';
import SingleReview from './SingleReview';

const SingleProduct = ({singleProduct, setSelectedProduct, reviews, setReviews}) => {
    return (
        <div>
          {console.log("this is single product.title", singleProduct.title)}
          <img src={singleProduct.url}/>
          <h3>{singleProduct.title}</h3>
          <p>Description: {singleProduct.description}</p>
          <p>Price: ${singleProduct.price/100}</p>
          <p>Quantity: {singleProduct.quantity}</p>
          <button onClick={() => setSelectedProduct({})}>View all products</button>
          <Link to="/review-form">Leave A Review</Link>
        <br></br>
        <br></br>
        <div>
          {/* <SingleReview reviews={reviews} setReviews={setReviews} singleProduct={singleProduct}/> */}
          {console.log("this is single reviewswewe: ", reviews)}
          {reviews ? (
            <div>
          <h2 className="title">Reviews</h2>
        <p>Description: {reviews.description}</p>
        <h3>Creator: {reviews.username}</h3>
        <b>Rating: {reviews.rating}</b>
        </div>) : <p>"There are no Reviews"</p>}
        </div>
        </div>
        
      );
};

export default SingleProduct;