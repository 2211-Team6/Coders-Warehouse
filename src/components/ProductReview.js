import React from 'react';
import ReviewForm from './ReviewForm';

const ProductReview = ({reviews, singleProduct}) => {
    console.log("here are the reviews in productReviews", reviews)

    return (
        <div>
            <h2 className="title">Reviews</h2>
            <ReviewForm singleProduct={singleProduct}/>
              {reviews.map((review) => (
                <div key={review.id}>
                  {console.log("Username", review.userName)}
                  <h3>Creator: {review.userName}</h3>
                  <p>Description: {review.description}</p>
                  <b>Rating: {review.rating}</b>
                  <br></br>
                  <br></br>
                </div>))}
        </div>
    );
};

export default ProductReview;