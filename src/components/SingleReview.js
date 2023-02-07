import React from "react";
import { Link } from "react-router-dom";
import { deleteReview } from "../api/auth";
import { checkUserLoggedIn } from "./Login";
import "../style/reviews.css";
import StarRating from "./StarRating";


const SingleReview = ({review, setReviews, reviews, singleProduct}) => {
    const handleDelete = (id) => {deleteReview(id, {setReviews, reviews})}
    console.log("this is review: ", review)
    return (
      <div className="single-review">
        <h2 className="title">{review.name}</h2>
        <p className="review-description">Description: {review.description}</p>
        <p className="review-creator">Creator: {review.username}</p>
        <b className="review-rating">Rating: {review.rating}</b>
        {/* {review.username ? (
          <button onClick={() => handleDelete(review._id)}>Delete</button>
        ) : checkUserLoggedIn() ? (
        <Link to="</review-form>" state={{ id: review._id }}>
        <button type="button">Send Review</button>
        </Link>) :
        <div></div>
        } */}
      </div>
    );
  };



  export default SingleReview;