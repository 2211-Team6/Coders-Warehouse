import React, {useState} from "react";
import { deleteReview, getReviews } from "../api/auth";
import { Link, useLocation } from "react-router-dom";
import { checkUserLoggedIn } from "./Login";
import SingleReview from "./SingleReview";


const AllReviews = (props) => {
    //will assign these props when I figure out where to put this component
    const { reviews, setReviews } = props;
    const [searchTerm, setSearchTerm] = useState('');
    
  
    const reviewMatches = (review, text) => {
      // return true if any of the fields you want to check against include the text
      // strings have an .includes() method 
      return Object.values(review).some(value => typeof value === 'string' && value.includes(text));
    }
  
    const filteredReviews = reviews.filter(review => reviewMatches(review, searchTerm)); //filter through each review that has text
    const reviewsToDisplay = searchTerm.length ? filteredReviews : reviews; //display all the reviews 
    return (
      <>
        <input className="searchBar" type="text" placeholder="Search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}></input>
        {reviewsToDisplay.map((review) => {
          return <SingleReview review={review} reviews={reviews} setReviews={setReviews} isAuthor={post.isAuthor} key={post._id}/>;
        })}
      </>
    );
  };
  export default AllReviews;



