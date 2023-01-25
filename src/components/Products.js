import React, { useState, useEffect } from "react";
import { getAllProducts, getProductById } from "../api/auth";
import SingleProduct from "./SingleProduct";

const Products = () => {
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
    console.log("Here is the single product", singleProduct)
    return (
      <div className="App">
        {console.log("this is single product.title", singleProduct[0].title)}
        <h3>{singleProduct[0].title}</h3>
        <p>{singleProduct[0].description}</p>
        <p>{singleProduct[0].price}</p>
        <p>{singleProduct[0].quantity}</p>
      </div>
    );
    // return <SingleProduct singleProduct={singleProduct}/>
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
          <p>Name: {product.title}</p>
          <p>Description: {product.description}</p>
          <p>Price: {product.price}</p>
          <p>Quantity: {product.quantity}</p>
          <button onClick={() => handleClick(product.id)}>View Product</button>
          <br></br>
        </div>
      ))}
    </div>
    
  );
};

export default Products;
