import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { getReviews } from "../api/auth";





// Create a form for making a review
const ReviewForm = () => {
    const { state } = useLocation();
    const id = state?.id;
    // console.log(id)
    const [content, setContent] = useState("")
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token")
           const response = await fetch(getReviews, {
  method: "POST",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    message: {
      content,
    }
  })
  })
        const newReview = await response.json();
        // console.log(newReview)
        setContent("")
        alert("Review sent!")
        } catch (error) {
            console.error(error)
        }
    }
    return (
      <form onSubmit={handleSubmit} className="reviewForm">
        Tell us about this product.
        <input className="newReview" type="text" value={content} onChange={e => setContent(e.target.value)} placeholder="Type something here..."></input>
        <button className="submit" type="submit">Send Review</button>
        </form>
    )
  }


 export default ReviewForm;