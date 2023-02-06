import React, { useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { fetchCart, removeCartProduct, updateCartProduct } from "../api/auth";


const Cart = ({cartItems, setCartItems, addToCart, user}) => {
  console.log("This is cart Items", cartItems)
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
      console.log("Here's the removed item", removedItem)
    }else {
      setCartItems(
        cartItems.map((product) => 
        product.id === item.id ? { ...exists, quantity: exists.quantity -1 } : product)
      )
      const id = user.id
      const productId = item.id
      const quantity = item.quantity - 1
      console.log("Here's the id, productId and quantity", id, productId, quantity)
      const updatedItem = await updateCartProduct(id, productId, quantity)
      console.log("Here's the updated item", updatedItem)
    }
  }
console.log("This is the user in cart.js", user)

useEffect(() => {
    const myCart = async () => {
      const id = user.id
      console.log("this is the id", id)
      const data = await fetchCart(id);
      console.log("This is data in cart.js", data)
      console.log("this is data.cartProducts", data.cartProducts)
      console.log("Andddd data.cartQuantities", data.cartQuantities)
      for(let i = 0; i < data.cartQuantities.length; i++){
        data.cartProducts[i].quantity = data.cartQuantities[i]
      }
      console.log("this is data.cartProducts NOW", data.cartProducts)
      setCartItems(data.cartProducts);
    };
    myCart();
  }, [user]);
  
  return (
    <div>
      <NavLink to="/">
          Home
        </NavLink>
      <h1>Cart Items</h1>
      <div>
        {cartItems.length === 0 && <div>Your cart is empty</div>}
      </div>
      {cartItems.map((item) => (
        <div key={item.id}>
          <div>{item.title}</div>
          <img src={item.url} className="productImg"/>
          <div>
            <button onClick={() => addToCart(item)}>+</button>
            <button onClick={() => removeFromCart(item)}>-</button>
          </div>
          <div>
              {item.quantity} x ${item.price}
          </div>
        </div>
      ))}
      {cartItems.length !== 0 && (
      <>
      <hr></hr>
      <div>
        <p>Items Price: ${itemsPrice.toFixed(2)}</p>
      </div>
      <div>
        <p>Tax: ${taxPrice.toFixed(2)}</p>
      </div>
      <div>
        <p>Shipping Cost: ${shippingPrice.toFixed(2)}</p>
      </div>
      <div>
        <h2>Total: ${totalPrice.toFixed(2)}</h2>
      </div>
      <button onClick={() => navigate("/checkout")}>Checkout</button>
      </>
      )}
    </div>
  )
}

export default Cart;
