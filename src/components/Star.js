import { FaStar } from "react-icons/fa";

// const createArray = (length) => [...Array(length)];

function Star({selected, onSelect}) {
    // console.log(selected);
    return <FaStar color={selected ? 'red' : 'black'} onClick= {onSelect}/>
}

export default Star;

