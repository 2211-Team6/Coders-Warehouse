import React, {useState} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Products from "./Products";
import SingleProduct from "./SingleProduct";
import Checkout from "./Checkout";
import cart from "./Cart";
import { checkUserLoggedIn } from "./Login";


const Home = ({token, setToken, reviews, setReviews}) => {
  const [selectedProduct, setSelectedProduct] = useState({})
  const location = useLocation();
  const navigate = useNavigate();

  return (
    // <div>
    //   <Link to="/login">Log in!</Link>
    //   <br></br>
    //   <Link to="/register">
    //     Register!
    //   </Link>
    //   <br></br>
    //   <Link to="/reviews">Product Reviews</Link>
    //   <br></br>
    //   <Link to="/cart"> Checkout here!</Link>
    //   <br></br>
    //   <Link to="/checkout"></Link>
    //   <br></br>
    //   {selectedProduct.id ? (
    //   <SingleProduct singleProduct={selectedProduct} setSelectedProduct={setSelectedProduct} reviews={reviews} setReviews={setReviews}/> 
    //   ) : (
    //     <Products selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} reviews={reviews} setReviews={setReviews} />)}
    // </div>
    <header className="header">
            <Link to="/" className="logo">
            <div id="Buyitup">Buy It Up!</div>
        </Link>
        <br/>
      {checkUserLoggedIn() ?
        <div>
            {/* <b className="welcome">Welcome, {username}!</b>
            <br/><hr/> */}
            <Link className="navlink" to="/">
          Home
        </Link>
        <br></br>
        <Link to="/reviews">Product Reviews</Link>
       <br></br>
       <Link to="/cart"> Checkout here!</Link>
       <br></br>
       <Link to="/checkout"></Link>
       <br></br>
       <button type="button" className="header-button logout" onClick={() => {
         localStorage.removeItem('token');
         setToken(null);
         location.pathname = "/";
         navigate("/login");
       }}>Logout</button>
       {selectedProduct.id ? (
      <SingleProduct singleProduct={selectedProduct} setSelectedProduct={setSelectedProduct} reviews={reviews} setReviews={setReviews}/> 
      ) : (
        <Products selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} reviews={reviews} setReviews={setReviews} />)}
        </div>
        :
        <div>
        <Link to="/login">Log in!</Link>
       <br></br>
    <Link to="/register">
         Register!
       </Link>
    <br></br>
       <Link to="/reviews">Product Reviews</Link>
    <br></br>
       <Link to="/cart"> Checkout here!</Link>
       <br></br>
       <Link to="/checkout"></Link>
       <br></br>
       {selectedProduct.id ? (
      <SingleProduct singleProduct={selectedProduct} setSelectedProduct={setSelectedProduct} reviews={reviews} setReviews={setReviews}/> 
      ) : (
        <Products selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} reviews={reviews} setReviews={setReviews} />)}
        </div>
        }   
        </header>
  );
};

export default Home