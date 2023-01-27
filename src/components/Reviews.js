import React, {useState, useEffect} from "react";
import { deleteReview, getReviews } from "../api/auth";
import { Link, useLocation } from "react-router-dom";
import { checkUserLoggedIn } from "./Login";
import SingleReview from "./SingleReview";



const AllReviews = ({reviews, setReviews}) => {
    //will assign these props when I figure out where to put this component
    // const [reviews, setReviews] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    
    useEffect(() => {
      const reviewsArr = async () => {
        const data = await getReviews();
        setReviews(data);
      };
      reviewsArr();
    }, []);
  
    const reviewMatches = (review, text) => {
      // return true if any of the fields you want to check against include the text
      // strings have an .includes() method 
      return Object.values(review).some(value => typeof value === 'string' && value.includes(text));
    }

    // console.log("this is review mataches: ", reviewMatches)
  
    // const filteredReviews = reviews.filter(review => reviewMatches(review, searchTerm)); //filter through each review that has text
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



