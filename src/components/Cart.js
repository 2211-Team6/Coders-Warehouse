import React, { useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { fetchCart, removeCartProduct, updateCartProduct } from "../api/auth";
import OrderSummary from "./OrderSummary";
import "../style/Cart.css"


const Cart = ({cartItems, setCartItems, addToCart, user}) => {
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
  const taxPrice = itemsPrice * 0.053;
  const shippingPrice = itemsPrice > 35 ? 0 : 10;
  const totalPrice = itemsPrice + taxPrice + shippingPrice
  const navigate = useNavigate();

  const removeFromCart = async (item) => {
    const exists = cartItems.find((product) => product.id === item.id)
    if(exists.quantity === 1){
      setCartItems(cartItems.filter((product) => product.id !== item.id))
      const removedItem = await removeCartProduct(item.id)
    }else {
      setCartItems(
        cartItems.map((product) => 
        product.id === item.id ? { ...exists, quantity: exists.quantity -1 } : product)
      )
      const id = user.id
      const productId = item.id
      const quantity = item.quantity - 1
      const updatedItem = await updateCartProduct(id, productId, quantity)
    }
  }

useEffect(() => {
    const myCart = async () => {
      const id = user.id
      const data = await fetchCart(id);
      for(let i = 0; i < data.cartQuantities.length; i++){
        data.cartProducts[i].quantity = data.cartQuantities[i]
      }
      setCartItems(data.cartProducts);
    };
    myCart();
  }, [user]);
  
  return (
    <div className="cart-container">
      <h1 className="cart-header">Cart Items</h1>
      <div className="empty-cart">
        {cartItems.length === 0 && <div>Your cart is empty</div>}
      </div>
      {cartItems.map((item) => (
        <div key={item.id}>
          <div className="cart-item-title">{item.title}</div>
          <img src={item.url} className="productImg"/>
          <div className="cart-item-actions">
            <button className="add-button" onClick={() => addToCart(item)}>+</button>
            <button className="remove-button" onClick={() => removeFromCart(item)}>-</button>
          </div>
          <div className="cart-item-price">
              {item.quantity} x ${item.price}
          </div>
        </div>
      ))}
      {cartItems.length !== 0 && (
      <>
      <hr className="cart-separator"></hr>
      <div className="cart-total-section">
        <p className="cart-total-price">Items Price: ${itemsPrice.toFixed(2)}</p>
      </div>
      <div className="cart-total-section">
        <p className="cart-total-price">Tax: ${taxPrice.toFixed(2)}</p>
      </div>
      <div className="cart-total-section">
        <p className="cart-total-price">Shipping Cost: ${shippingPrice.toFixed(2)}</p>
      </div>
      <div className="cart-total-section">
        <h2 className="cart-total">Total: ${totalPrice.toFixed(2)}</h2>
      </div>
      <button className="checkout-button" onClick={() => navigate("/checkout")}>Checkout</button>
      </>
      )}
    </div>
  )
}

export default Cart;
