import React from 'react';
import { Link } from 'react-router-dom';
import ProductReview from './ProductReview';

const SingleProduct = ({singleProduct, setSelectedProduct, reviews}) => {
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
            <Link to="/review-form">Leave A Review</Link>
          </div>
        </div>
        <br></br>
        <br></br>
        <div class="single-review">
          {console.log("Here are the reviews", reviews)}
          {reviews.length > 0 ? (<ProductReview reviews={reviews}/>
            ) : 
            <p>"There are no Reviews"</p>}
        </div>
      </div>
      );
};

export default SingleProduct;