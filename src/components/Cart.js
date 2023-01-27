import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Checkout from "./Checkout";
import { updateCartProduct, removeCartProduct, fetchCartProducts, calculateTotalPrice} from "../api/auth"

const cart = (props) => {

  
  const [allCartPurchases , setallCartPurchases ] = useState({});
  const [cart, setCart] = useState([]);
  const navigate = useNavigate;
  
  const fetchCartProducts = async() => {
    const products = await fetchCartProducts();
    setallCartPurchases(products);
  }
  // useEffect(() => {
  //   fetchCartProducts();
  // }, [fetchCartProducts]);

//a new start

  const addProductToCart = (productId, quantity) => {
    updateCartProduct(productId, quantity)
      .then((updatedCart) => {
        setCart(updatedCart);
      })
      .catch((error) => console.log(error));
  };

  const updatecartProduct = (product) => {
    updateCartProduct(product.id, product.quantity)
      .then((products) => {
        setallCartPurchases (products);
      })
      .catch((error) => console.log(error));
  };

  const removeCartProduct = (cartProductId) => {
    removeCartProduct(cartProductId)
      .then((products) => {
        setallCartPurchases (products);
      })
      .catch((error) => console.log(error));
  };

  const calculateTotalPrice = () => {
    let price = 0;
    if (Array.isArray(allCartPurchases )) {
      allCartPurchases .forEach((product) => {
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


  let cartProductsLi;
  if (allCartPurchases .length > 0) {
    cartProductsLi = allCartPurchases .map((product) => {
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
                  onClick={() => removeCartProduct(product.id)}
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
  console.log("here it is", allCartPurchases)
  
  return (
    <div className="cart-container">
    <ul className="cart-products-list">
    <h2>{allCartPurchases .length} product(s) in your cart</h2>
    {cartProductsLi}
    </ul>
    <div className="cart-total">
    <h4>Total: USD {calculateTotalPrice()}</h4>
    <Link to="/checkout">
      <button className="checkout-btn">Checkout</button>
    </Link>
    </div>
    </div>
    );
};

export default cart;
