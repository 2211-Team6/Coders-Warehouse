import React from 'react';
import { useState, useEffect } from 'react';
import { getAllProducts, createProduct, fetchMe } from '../../api/auth';

const NewProductForm = ({ products, setProducts, }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [url, setUrl] = useState("");
    const [admin, setAdmin] = useState({});

    useEffect(() => {
        const getMe = async () => {
          const token = localStorage.getItem("token");
          const data = await fetchMe(token);
          console.log("here is your data", data)
          setAdmin(data);
        };
          getMe();
          console.log("Here's the user", admin)
      }, []);


    const handleSubmit = async (e) => {
        console.log("Handling the submit")
      try {
        e.preventDefault();
        const oldProducts = await getAllProducts();
        oldProducts.map((product) => {
          if (product.title === title) {
            alert("Product already exists");
            setTitle("");
            setDescription("");
            setPrice("");
            setQuantity("");
            setUrl("");
            return;
          }
        });
        console.log("Out of the products. Here's user", admin)
        const token = localStorage.getItem("token")
        console.log("About to create Product")
        const newProduct = await createProduct(token, title, description, price, quantity, url, admin);
        setTitle("");
        setDescription("");
        setPrice(0);
        setQuantity(0);
        setUrl("");
        console.log("Here's the new Products")
        setProducts([newProduct, ...products]);
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <div>
        <h4>Add a new Product</h4>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            name="title"
            value={title}
            type="text"
            required
            placeholder="product name"
            onChange={(e) => setTitle(e.target.value)}
          ></input>
  
          <br></br>
  
          <input
            name="description"
            value={description}
            type="text"
            required
            placeholder="description"
            onChange={(e) => setDescription(e.target.value)}
          ></input>
          <br></br>

          <input
            name="price"
            value={price}
            type="number"
            required
            placeholder="price"
            onChange={(e) => setPrice(e.target.value)}
          ></input>
  
          <br></br>

          <input
            name="quantity"
            value={quantity}
            type="number"
            required
            placeholder="quantity in stock"
            onChange={(e) => setQuantity(e.target.value)}
          ></input>
  
          <br></br>
  
          <input
            name="url"
            value={url}
            type="text"
            required
            placeholder="url for the photo"
            onChange={(e) => setUrl(e.target.value)}
          ></input>
  
          <br></br>
  
  
          <button className="login submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  };

export default NewProductForm;