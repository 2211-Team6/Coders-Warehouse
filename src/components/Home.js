import React, {useState, useEffect} from "react";
import { Link, useLocation, useNavigate, NavLink } from "react-router-dom";
import Products from "./Products";
import SingleProduct from "./SingleProduct";
import Checkout from "./Checkout";
import cart from "./Cart";
import "../style/Home.css"
import { checkUserLoggedIn } from "./Login";
import { fetchMe } from "../api/auth";
import Admin from "./Admin";


const Home = ({token, setToken, reviews, setReviews, cartItems, setCartItems, addToCart, user, setUser, products, setProducts}) => {
  const [selectedProduct, setSelectedProduct] = useState({})
  const location = useLocation();
  const navigate = useNavigate()
 
  
  return (
    <div style={{display: "flex", flexDirection: "column"}}>
       <nav style={{display: "block"}}>

    <header className="header">
            <Link to="/" className="logo">
            <div id="Buyitup">Buy It Up!</div>
        </Link>
        <nav class="main-nav">
        <ul class="horizontal nav-list full-width">
        <li><a href=""><i class="material-icons">shopping_cart</i></a></li>
        </ul>
        </nav>
        <br/>
        
      {checkUserLoggedIn() ? user.isAdmin ? (<Admin setSelectedProduct={setSelectedProduct}/>) :
        (<div>
            <NavLink to="/">
          Home
        </NavLink>
        <br></br>
        <NavLink to="/reviews">Product Reviews</NavLink>
       <br></br>
       <NavLink to="/cart"> Checkout here!</NavLink>
       <br></br>
       <NavLink to="/checkout"></NavLink>
       <br></br>
       <button type="button" className="header-button logout" onClick={() => {
         localStorage.removeItem('token');
         setToken(null);
         location.pathname = "/";
         navigate("/login");
       }}>Logout</button> 
       </div>) : (
       <div>
      <NavLink to="/login">Log in!</NavLink>
      <br></br>
      <NavLink to="/register">
        Register!
      </NavLink>
      <br></br>
      <NavLink to="/reviews">Product Reviews</NavLink>
      <br></br>
      <NavLink to="/cart"> Checkout here!</NavLink>
      <br></br>
      <NavLink to="/checkout"></NavLink>
      <br></br>
      </div>)}
      </header>
       <nav>
       <h1>Hello, {user?.username}!</h1>
       <br></br>
      {selectedProduct.id ? (
       <div>
        <SingleProduct 
      singleProduct={selectedProduct} 
      setSelectedProduct={setSelectedProduct} 
      cartItems={cartItems}
      setCartItems={setCartItems}
      addToCart={addToCart}
      reviews={reviews} 
      setReviews={setReviews}/> 
      </div>
      ) : (
        <div>
        <Products 
        selectedProduct={selectedProduct} 
        setSelectedProduct={setSelectedProduct} 
        reviews={reviews} 
        setReviews={setReviews} 
        cartItems={cartItems}
        setCartItems={setCartItems}
        addToCart={addToCart} 
        products={products}
        setProducts={setProducts}/>
        </div>)}
        </nav>
        </nav>
    </div>
  );
};

export default Home
