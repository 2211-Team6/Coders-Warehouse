import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCartItems, updateCartItem, deleteCartItem } from "../api/auth"

const cart = (props) => {
  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = () => {
    getCartItems().then((items) => {
      console.log(items)
      setAllCartItemsArray(items);
    });
  };

  const updateCartItem = (item) => {
    getCartItems(item.id, item.quantity)
      .then((items) => {
        setAllCartItemsArray(items);
      })
      .catch((error) => console.log(error));
  };

  const removeCartItem = (cartItemId) => {
    deleteCartItem(cartItemId)
      .then((items) => {
        setAllCartItemsArray(items);
      })
      .catch((error) => console.log(error));
  };

  const calculateTotalPrice = () => {
    let price = 0;
    if (Array.isArray(allCartItemsArray)) {
      allCartItemsArray.forEach((item) => {
        price += item.quantity * item.price;
      });
    }
    return price;
  };


  const directToProduct = (productId) => {
    return (event) => {
      props.history.push(`/products/${productId}`);
    };
  };

  const [allCartItemsArray, setAllCartItemsArray] = useState([]);

  let cartItemsLi;
  if (allCartItemsArray.length > 0) {
    cartItemsLi = allCartItemsArray.map((item) => {
      return (
        <li key={item.id}>
          <div className="item-info">
            <div className="item-pic-title">
              <img
                src={item.imageUrls[0]}
                onClick={directToProduct(item.productId)}
              />
              <div>
                <p onClick={directToProduct(item.productId)}>
                  {item.productName}
                </p>
                <button
                  className="clicky"
                  onClick={() => removeCartItem(item.id)}
                >
                  <i className="Hit Me!" aria-hidden="true"></i>
                </button>
              </div>
            </div>

            <div>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  updateCartItem({ id: item.id, quantity: e.target.value })
                }
              />
            </div>
            <div className="price-column">
              <h4>USD {item.price * item.quantity}</h4>
              <p>USD {item.price} each</p>
            </div>
          </div>
        </li>
      );
    });
  } else {
    cartItemsLi = <div>Your cart is empty</div>;
  }

  return (
    <div className="cart-items-checkout">
      <ul className="cart-items-list">
        <h2>{allCartItemsArray.length} item(s) in your cart</h2>
        {cartItemsLi}
      </ul>

      <ul className="checkout">
        <div className="items-total">
          <li>
            <span>Item(s) total</span>
            <span>USD {calculateTotalPrice()}</span>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default cart;
