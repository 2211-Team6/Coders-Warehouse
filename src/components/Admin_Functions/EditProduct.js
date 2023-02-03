import React from 'react';
import { useState } from 'react';
import { deleteProduct, updateProduct } from '../../api/auth';

const EditProduct = ({singleProduct}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [url, setUrl] = useState("");

    const handleSubmit = async (e) => {
        try {
          e.preventDefault();
          const token = localStorage.getItem("token")
          const id = singleProduct.id
          const updatedProduct = await updateProduct(
            id,
            token,
            title,
            description,
            price,
            quantity,
            url
          );
        console.log("Here is the updated product", updatedProduct)
        return updatedProduct
        } catch (error) {
          console.error(error);
        }
      };

      const handleDelete = async(id) => {
        const result = await deleteProduct(id);
        console.log("I deleted this", result)
        alert("Product has been deleted")
      }

    return (
        <div>
            <div class="single-product-container">
            <img src={singleProduct.url} />
            <form onSubmit={(e) => handleSubmit(e)}>
          <input
            name="title"
            value={title}
            type="text"
            placeholder={singleProduct.title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
  
          <br></br>
  
          <input
            name="description"
            value={description}
            type="text"
            placeholder={singleProduct.description}
            onChange={(e) => setDescription(e.target.value)}
          ></input>
          <br></br>

          <input
            name="price"
            value={price}
            type="number"
            placeholder={singleProduct.price}
            onChange={(e) => setPrice(e.target.value)}
          ></input>
  
          <br></br>

          <input
            name="quantity"
            value={quantity}
            type="number"
            placeholder={singleProduct.quantity}
            onChange={(e) => setQuantity(e.target.value)}
          ></input>
  
          <br></br>
  
          <input
            name="url"
            value={url}
            type="text"
            placeholder={singleProduct.url}
            onChange={(e) => setUrl(e.target.value)}
          ></input>
  
          <br></br>
  
  
          <button className="login submit" type="submit">
            Update Product
          </button>
        </form>
        <button onClick={() => handleDelete(singleProduct.id)}>Delete product</button>
        </div>
        </div>
    );
};

export default EditProduct;