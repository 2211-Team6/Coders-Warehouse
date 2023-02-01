import React from "react";
import { deleteReview } from "../api/auth";

const SingleReview = ({review, setReviews, reviews}) => {
    const handleDelete = (id) => {deleteReview(id, {setReviews, reviews})}
    return (
      <div className="single-review">
        <h2 className="title">Reviews</h2>
        <p>Description: {review.description}</p>
        <p>Creator: {review.username}</p>
        <b>Rating: {review.rating}</b>
      </div>
    );
  };



  export default SingleReview;