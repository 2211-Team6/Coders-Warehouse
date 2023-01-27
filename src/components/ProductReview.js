import React from 'react';

const ProductReview = ({reviews}) => {
    console.log("here are the reviews in productReviews", reviews)
    return (
        <div>
            <h2 className="title">Reviews</h2>
              {reviews.map((review) => (
                <div key={review.id}>
                  <p>Description: {review.description}</p>
                  <h3>Creator: {review.username}</h3>
                  <b>Rating: {review.rating}</b>
                </div>))}
        </div>
    );
};

export default ProductReview;