import React, {useState, useEffect} from "react";
import { deleteReview, getReviews } from "../api/auth";
import { Link, useLocation } from "react-router-dom";
import { checkUserLoggedIn } from "./Login";
import SingleReview from "./SingleReview";



const AllReviews = ({reviews, setReviews}) => {
    const [searchTerm, setSearchTerm] = useState('');
    
    useEffect(() => {
      const reviewsArr = async () => {
        const data = await getReviews();
        setReviews(data);
      };
      reviewsArr();
    }, []);
  
    const reviewMatches = (review, text) => {
      return Object.values(review).some(value => typeof value === 'string' && value.includes(text));
    }
    const reviewsToDisplay = searchTerm.length ? filteredReviews : reviews; //display all the reviews 
    return (
      <>
      <Link to="/">Back to Home</Link>
      <br></br>
        <input className="searchBar" type="text" placeholder="Search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}></input>
        {console.log(reviews)}
        {reviewsToDisplay.map((review) => {
          return <SingleReview key={review.id} review={review} reviews={reviews} setReviews={setReviews} />;
        })}
      </>
    );
  };
  export default AllReviews;



