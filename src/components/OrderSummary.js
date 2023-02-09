import React from "react";
import Cart from "./Cart";
import Checkout from "./Checkout";


function OrderSummary({ cartItems }) {
    console.log("This is the cart items", cartItems);
    let itemsPrice = 0;
  if (cartItems && cartItems.length) {
    itemsPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
  }


  const taxPrice = itemsPrice * 0.053;
  const shippingPrice = itemsPrice > 35 ? 0 : 10;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;
  return (
    <div>
      <h3>Order Summary:</h3>
      <div className="card">
        <h1 className="title">Purchase Receipt</h1>
        <div className="pricing">
        {cartItems && cartItems.length ? (
            cartItems.map((item) => (
              <div key={item.id}>
                <div>{item.title}</div>
                <img src={item.url} className="productImg" />
              </div>
            ))
          ) : (
            <div>No items in cart</div>
          )}
        </div>
        <div className="row">
          <h2>Total: ${totalPrice.toFixed(2)}</h2>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;