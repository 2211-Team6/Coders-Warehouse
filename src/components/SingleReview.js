import React from "react";
import { Link } from "react-router-dom";
import { deleteReview } from "../api/auth";
import { checkUserLoggedIn } from "./Login";




const SingleReview = ({review, setReviews, reviews}) => {
    const handleDelete = (id) => {deleteReview(id, {setReviews, reviews})}
    return (
      <div className="single-review">
        <h2 className="title">{review.productId}</h2>
        <p>Description: {review.description}</p>
        <h3>Creator: {review.userName}</h3>
        <b>Rating: {review.rating}</b>
        {review.userName ? (
          <button onClick={() => handleDelete(review._id)}>Delete</button>
        ) : checkUserLoggedIn() ? (
        <Link to="/review-form" state={{ id: review._id }}>
        <button type="button">Send Message</button>
        </Link>) :
        <div></div>
        }
      </div>
    );
  };



  export default SingleReview;