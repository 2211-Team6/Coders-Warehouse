import { useState } from "react";
import Star from "./Star";


const createArray = (length) => [...Array(length)];

const StarRating = ({totalStars, setRating, rating}) => {
    const [selectedStars, setSelectedStars] = useState(0)
    console.log("this is selected stars: ", rating)
    return <>
    {createArray(totalStars).map((n, index) => {
        return (
        <Star
        key={index} 
        selected={rating > index} 
        onSelect={() => setRating(index + 1)}
        />
        )  
    })}
    </>
}

export default StarRating;

