import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import ProductReview from './ProductReview';

const SingleProduct = ({singleProduct, setSelectedProduct, reviews, setCartItems, cartItems, addToCart}) => {
  const navigate = useNavigate();
  console.log("This is cart items in singleProduct", cartItems)

  // const addToCart = (singleProduct) => {
  //   const exists = cartItems.find((product) => product.id === singleProduct.id)
  //     if (exists){
  //       setCartItems(
  //         cartItems.map((product) =>  
  //         product.id === singleProduct.id ? { ...exists, quantity: exists.quantity + 1 } : product
  //       )
  //       );
  //     } else {
  //       setCartItems([...cartItems, { ...singleProduct, quantity: 1}]);
  //     }
  //   };
  
    return (
      <div>
        <div class="single-product-container">
          <div>
            <img src={singleProduct.url}/>
          </div>
          <div>
            <h3>{singleProduct.title}</h3>
            <p>Description: {singleProduct.description}</p>
            <p>Price: ${singleProduct.price/100}</p>
            <p>Quantity: {singleProduct.quantity}</p>
            <button onClick={() => addToCart(singleProduct)}> Add to Cart</button>
            <button onClick={() => setSelectedProduct({})}>View all products</button>
          </div>
        </div>
        <br></br>
        <br></br>
        <div class="single-review">
          {reviews.length > 0 ? 
          (<ProductReview reviews={reviews} singleProduct={singleProduct}/>
            ) : 
            <p>"There are no Reviews"</p>}
        </div>
      </div>
      );
};

export default SingleProduct;