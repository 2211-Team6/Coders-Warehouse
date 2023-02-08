import React from 'react';
import ReviewForm from './ReviewForm';

const ProductReview = ({reviews, singleProduct}) => {

    return (
        <div className='product-review'>
            <h2 className="title">Reviews</h2>
            <ReviewForm singleProduct={singleProduct}/>
              {reviews.map((review) => (
                <div className="product-review" key={review.id}>
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