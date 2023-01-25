import React, { useState, useEffect } from "react";
import { getAllProducts } from "../api/auth";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const productsArr = async () => {
      const data = await getAllProducts();
      console.log("here is the data", data)
      setProducts(data);
    };
    productsArr();
    console.log("Here are the products from products line 15", products)
  }, []);

  const filteredProducts = products.filter(product => product.title.toLowerCase().includes(searchInput.toLowerCase()));


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
          <br></br>
        </div>
      ))}
    </div>
  );
};

export default Products;
