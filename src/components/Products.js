import React, { useState, useEffect } from "react";
import { getAllProducts, getProductById, getReviewsByProductId } from "../api/auth";
import "../style/Products.css"
import { useNavigate } from 'react-router-dom'


const Products = ({ setSelectedProduct, setReviews, cartItems, setCartItems, addToCart, products, setProducts, filteredProducts }) => {

  const navigate = useNavigate(); 

  const handleClick = async (productId) => {
    const singleProduct = await getProductById(productId)
    console.log("here is the singleProduct", singleProduct)
    const singleReview = await getReviewsByProductId(productId)
    setSelectedProduct(singleProduct[0])
    setReviews(singleReview)
    navigate("/product")
    console.log("here is the selectedProduct", singleProduct[0])
  }


  return (
    <div className="products-container">
    {filteredProducts.map((product) => (
      <div key={product.id} className="product-item">
        <img src={product.url} alt={product.title} className="product-img"/>
        <p className="product-title">{product.title}</p>
        <p className="product-description">{product.description}</p>
        <div className="buttons-container">
          <button onClick={() => handleClick(product.id)} className="view-button">View</button>
          <button onClick={() => addToCart(product)} className="add-to-cart-button">Add to Cart</button>
        </div>
      </div>
    ))}
  </div>
    
  );
};

export default Products;
