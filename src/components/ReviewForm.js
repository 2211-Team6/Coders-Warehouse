import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addReview, getReviews, fetchMe } from "../api/auth";


// Create a form for making a review
const ReviewForm = ({singleProduct}) => {
    const { state } = useLocation();
    const id = state?.id;
    // console.log(id)
    const [rating, setRating] = useState("")
    const [description, setDescription] = useState("")
    const [currentUser, setCurrentUser] = useState({})
    const navigate = useNavigate();

    useEffect(() => {
      const getMe = async () => {
        const token = localStorage.getItem("token");
        const data = await fetchMe(token);
        setCurrentUser(data)
      };
        getMe();
    }, []);
  
    const handleSubmit = async (e) => {
        e.preventDefault();
       try{
        const userName = currentUser.username
        const productId = singleProduct.id
        const newReview = await addReview(userName, productId, rating, description);
        setRating("")
        setDescription("")
        alert("Review sent!")
        navigate("/")
        return newReview;
        } catch (error) {
            console.error(error)
        }
        
    }
    return (
      <form onSubmit={(e) => handleSubmit(e)} className="reviewForm">
        Leave your review here! 
        <br></br>
        <input 
        className="newReview" 
        name="Rating"
        type="number" 
        value={rating} 
        placeholder="Rating? (out of 10)"
        onChange={(e) => setRating(e.target.value)} >
        </input>
        <br></br>
        <input 
        name="Content"
        className="newReview" 
        type="text" 
        value={description} 
        placeholder="Type your review here"
        onChange={(e) => setDescription(e.target.value)} >
        </input>
        <br></br>
        <button className="submit" type="submit">Send Review</button>
        </form>
    )
  }


 export default ReviewForm;