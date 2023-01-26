import React, { useState, useEffect } from "react";
import { getAllProducts, getProductById } from "../api/auth";

const Products = ({selectedProduct, setSelectedProduct, id, title, image, price, review}) => {
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [cart, setCart] = useState([]);
  

  useEffect(() => {
    const productsArr = async () => {
      const data = await getAllProducts();
      setProducts(data);
    };
    productsArr();
  }, []);

  const filteredProducts = products.filter(product => product.title.toLowerCase().includes(searchInput.toLowerCase()));


  const addToCart = async (productId) => {
    const addedProduct = await getProductById(productId)
    setCart(addedProduct, ...cart)
    console.log("item added", addedProduct)
  }

  const handleClick = async (productId) => {
    const singleProduct = await getProductById(productId)
    setSelectedProduct(singleProduct[0])
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
          <button onClick={() => addToCart(product.id)}> Add to Cart</button>
          <br></br>
        </div>
      ))}
    </div>
    
  );
};

export default Products;
