import React, {  useState  } from "react";
import { Link, useLocation, useNavigate, NavLink } from "react-router-dom";
import Products from "./Products";
import SingleProduct from "./SingleProduct";
import "../style/Home.css";
import { checkUserLoggedIn } from "./Login";
import Admin from "./Admin";
import Navbar from "./Navbar";


const Home = ({token, setToken, reviews, setReviews, cartItems, setCartItems, addToCart, user, setUser, products, setProducts}) => {
  const [selectedProduct, setSelectedProduct] = useState({})
  const location = useLocation();
  const navigate = useNavigate()
 
  
  return (
    <div style={{display: "flex", flexDirection: "column"}}>
    <nav style={{display: "block"}}>

 <header className="header">
     <br/>
      {checkUserLoggedIn() ? user.isAdmin ? (<Admin setSelectedProduct={setSelectedProduct}/>) :
        (<div>
        <h1>Hello, {user?.username}!</h1>
       </div>) : (
       <div>
      <h1>Hello, Stranger!</h1>
      </div>)}
      </header>
       <nav>
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

export default Home; 