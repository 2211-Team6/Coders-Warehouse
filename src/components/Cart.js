import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { updatecartProduct, removecartProduct, fetchcartProducts} from "../api/auth"

const cart = (props) => {
  useEffect(() => {
    fetchcartProducts();
  }, []);

  // const fetchcartProducts = () => {
  //   e.preventDefault();
  //   fetchcartProducts().then((items) => {
  //     console.log(items)
  //     setAllcartProductsArray(items);
  //   });
  // };

  const updatecartProduct = (product) => {
    fetchcartProducts(product.id, product.quantity)
      .then((products) => {
        setAllcartProductsArray(products);
      })
      .catch((error) => console.log(error));
  };

  const removecartProduct = (cartProductId) => {
    deletecartProduct(cartProductId)
      .then((products) => {
        setAllcartProductsArray(products);
      })
      .catch((error) => console.log(error));
  };

  const calculateTotalPrice = () => {
    let price = 0;
    if (Array.isArray(allcartProductsArray)) {
      allcartProductsArray.forEach((product) => {
        price += product.quantity * product.price;
      });
    }
    return price;
  };


  const directToProduct = (productId) => {
    return (event) => {
      props.push(`/products/${productId}`);
    };
  };

  const [allcartProductsArray, setAllcartProductsArray] = useState([]);

  let cartProductsLi;
  if (allcartProductsArray.length > 0) {
    cartProductsLi = allcartProductsArray.map((product) => {
      return (
        <li key={product.id}>
          <div className="product-info">
            <div className="product-pic-title">
              <img
                src={product.imageUrls[0]}
                onClick={directToProduct(product.productId)}
              />
              <div>
                <p onClick={directToProduct(product.productId)}>
                  {product.productName}
                </p>
                <button
                  className="clicky"
                  onClick={() => removecartProduct(product.id)}
                >
                  <i className="Hit Me!" aria-hidden="true"></i>
                </button>
              </div>
            </div>

            <div>
              <input
                type="number"
                value={product.quantity}
                onChange={(e) =>
                  updatecartProduct({ id: product.id, quantity: e.target.value })
                }
              />
            </div>
            <div className="price-column">
              <h4>USD {product.price * product.quantity}</h4>
              <p>USD {product.price} each</p>
            </div>
          </div>
        </li>
      );
    });
  } else {
    cartProductsLi = <div>Your cart is empty</div>;
  }

  return (
    <div className="cart-products-checkout">
      <ul className="cart-products-list">
        <h2>{allcartProductsArray.length} product(s) in your cart</h2>
        {cartProductsLi}
      </ul>

      <ul className="checkout">
        <div className="product-total">
          <li>
            <span>Product(s) total</span>
            <span>USD {calculateTotalPrice()}</span>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default cart;
