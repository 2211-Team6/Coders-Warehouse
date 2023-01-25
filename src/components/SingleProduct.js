import React from 'react';

const SingleProduct = ({singleProduct, setSelectedProduct}) => {
    return (
        <div>
          {console.log("this is single product.title", singleProduct.title)}
          <h3>{singleProduct.title}</h3>
          <p>Description: {singleProduct.description}</p>
          <p>Price: ${singleProduct.price/100}</p>
          <p>Quantity: {singleProduct.quantity}</p>
          <button onClick={() => setSelectedProduct({})}>View all products</button>
        </div>
      );
};

export default SingleProduct;