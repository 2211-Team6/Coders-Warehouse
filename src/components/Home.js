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
  const [searchInput, setSearchInput] = useState("");

  const filteredProducts = products.filter(product => product.title.toLowerCase().includes(searchInput.toLowerCase()));

  console.log("here are the products", products)
  
  return (
    <div style={{display: "flex", flexDirection: "column"}}>
    <nav style={{display: "block"}}>

 <header className="header">
     <br/>
      {checkUserLoggedIn() ? user.isAdmin ? (<Admin setSelectedProduct={setSelectedProduct}/>) :
        (<div className="header">
           <input
      className="search"
      placeholder="Search"
      value={searchInput}
      type="text"
      onChange={(e) => setSearchInput(e.target.value)}
  ></input>
        <h1>Hello, {user?.username}!</h1>
       </div>) : (
       <div className="header">
         <input
      className="search"
      placeholder="Search"
      value={searchInput}
      type="text"
      onChange={(e) => setSearchInput(e.target.value)}
  ></input>
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
      setReviews={setReviews}
      checkUserLoggedIn={checkUserLoggedIn}/> 
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
        setProducts={setProducts}
        filteredProducts={filteredProducts}/>
        </div>)}
        </nav>
        </nav>
    </div>
  ); 
};

export default Home;



// old code for reference
 