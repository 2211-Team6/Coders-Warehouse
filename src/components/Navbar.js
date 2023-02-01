// import React, { useEffect, useState} from "react";
// import { NavLink, useLocation, useNavigate, Link } from "react-router-dom";
// import Products from "./Products";
// import SingleProduct from "./SingleProduct";
// import { checkUserLoggedIn } from "./Login";
// import { fetchMe } from "../api/auth";

// const Navbar = ({token,
//     setToken,
//     reviews,
//     setReviews,
//     cartItems,
//     setCartItems,
//     addToCart,
//     user,
//     setUser,}) => {
//     const [selectedProduct, setSelectedProduct] = useState({});
//     const location = useLocation();
//     const navigate = useNavigate();
  
//     useEffect(() => {
//       const getMe = async () => {
//         const token = localStorage.getItem("token");
//         const data = await fetchMe(token);
//         setUser(data);
//       };
//       if (token) {
//         getMe();
//       }
//     }, [token]);
  


//     return (
//         <div style={{ display: "flex", flexDirection: "column" }}>
//             <nav>

//   <header className="header">
//     <Link to="/" className="logo">
//       <div id="Buyitup">Buy It Up!</div>
//     </Link>
//     {checkUserLoggedIn() ? (
//       <div className="header-nav">
//         <NavLink to="/" className="header-nav-link">
//           Home
//         </NavLink>
//         <NavLink to="/reviews" className="header-nav-link">
//           Product Reviews
//         </NavLink>
//         <NavLink to="/cart" className="header-nav-link">
//           Checkout
//         </NavLink>
//         <button
//           type="button"
//           className="header-button logout"
//           onClick={() => {
//             localStorage.removeItem("token");
//             setToken(null);
//             navigate("/login");
//           }}
//         >
//           Logout
//         </button>
//       </div>
//     ) : (
//       <div className="header-nav">
//         <NavLink to="/login" className="header-nav-link">
//           Login
//         </NavLink>
//         <NavLink to="/register" className="header-nav-link">
//           Register
//         </NavLink>
//         <NavLink to="/reviews" className="header-nav-link">
//           Product Reviews
//         </NavLink>
//         <NavLink to="/cart" className="header-nav-link">
//           Checkout
//         </NavLink>
//       </div>
//     )}
//   </header>
//   <main className="main">
//     <h1>Hello, {user?.username}!</h1>
//     {selectedProduct.id ? (
//       <SingleProduct
//         singleProduct={selectedProduct}
//         setSelectedProduct={setSelectedProduct}
//         cartItems={cartItems}
//         setCartItems={setCartItems}
//         addToCart={addToCart}
//         reviews={reviews}
//         setReviews={setReviews}
//       />
//     ) : (
//       <Products
//         selectedProduct={selectedProduct}
//         setSelectedProduct={setSelectedProduct}
//         reviews={reviews}
//         setReviews={setReviews}
//         cartItems={cartItems}
//         setCartItems={setCartItems}
//         addToCart={addToCart}
//       />
//     )}
//   </main>
//             </nav>
// </div>

//     )
// }

// export default Navbar;