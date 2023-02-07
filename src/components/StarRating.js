import { useState } from "react";
import Star from "./Star";

const createArray = (length) => [...Array(length)];

const StarRating = ({totalStars}) => {
    const [selectedStars, setSelectedStars] = useState(0)
    console.log("this is selected stars: ", selectedStars)
    return <>
    {createArray(totalStars).map((n, index) => {
        return (
        <Star 
        key={index} 
        selected={selectedStars > index} 
        onSelect={() => setSelectedStars(index + 1)}
        />
        )  
    })}
    </>
}

export default StarRating;

