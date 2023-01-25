import React from 'react';

const SingleProduct = ({singleProduct}) => {
    return (
        <div className="App">
          {console.log("this is single product.title", singleProduct.title)}
          <h3>{singleProduct.title}</h3>
          <p>{singleProduct.description}</p>
          <p>{singleProduct.price}</p>
          <p>{singleProduct.quantity}</p>
        </div>
      );
};

export default SingleProduct;