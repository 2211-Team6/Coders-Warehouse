import React, { useState, useEffect } from "react";
import { getAllProducts, getProductById, getReviewsByProductId } from "../api/auth";

const Products = ({selectedProduct, setSelectedProduct, reviews, setReviews}) => {
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const productsArr = async () => {
      const data = await getAllProducts();
      setProducts(data);
    };
    productsArr();
  }, []);

  const filteredProducts = products.filter(product => product.title.toLowerCase().includes(searchInput.toLowerCase()));

  const handleClick = async (productId) => {
    const singleProduct = await getProductById(productId)
    const singleReview = await getReviewsByProductId(productId)
    setSelectedProduct(singleProduct[0])
    console.log("this is single Review: ", singleReview[0])
    setReviews(singleReview[0])
  }

  return (
    <div>
      <input
            className="search"
            placeholder="Search"
            value={searchInput}
            type="text"
            onChange={(e) => setSearchInput(e.target.value)}
        ></input>
      {filteredProducts.map((product) => (
        <div key={product.id}>
          <p>{product.title}</p>
          <p>Description: {product.description}</p>
          {/* <p>Price: {product.price}</p>
          <p>Quantity: {product.quantity}</p> */}
          <button onClick={() => handleClick(product.id)}>View Product</button>
          <br></br>
          <br></br>
        </div>
      ))}
    </div>
    
  );
};

export default Products;
