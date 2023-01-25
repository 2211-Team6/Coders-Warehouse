import React, { useState, useEffect } from "react";
import { getAllProducts } from "../api/auth";
import {useStateValue} from "../Helpers/StateProvider"

const Products = ({id, title, image, price, review }) => {
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  // const [cart, setCart] = useState([]);
  const [{ cart }, dispatch] = useStateValue();
  

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

  const addToCart = () => {
    // dispatch the item into the data layer
    dispatch({
      type: "ADD_TO_CART",
      product: {
        id: id,
        title: title,
        image: image,
        price: price,
        review: review,
      },
    });
  };

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
          <button onClick={addToCart}> Add to Cart</button>
          <br></br>
        </div>
      ))}
    </div>
  );
};

export default Products;
