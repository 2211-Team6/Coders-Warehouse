import React, { useEffect, useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { fetchCart, fetchMe, getProductById, removeCartProduct, updateCartProduct } from "../api/auth";
import Checkout from "./Checkout";

//a new start

const Cart = ({cartItems, setCartItems, addToCart, user}) => {
  console.log("This is cart Items", cartItems)
  // const [quantity, setQuantity] = useState([])
  const itemsPrice = cartItems.reduce((a, c) => a + c.price/100 * c.quantity, 0);
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
      // console.log("quantity at 0", data.cartProducts[1].quantity)
      // data.cartProducts[1].quantity = data.cartQuantities[1]
      console.log("this is data.cartProducts NOW", data.cartProducts)
      setCartItems(data.cartProducts);
      // setQuantity(data.cartQuantities)
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
            {/* {for(let i = 0; i < cartItems.length; i++){
              item.quantity = quantity[i]
            }} */}
              {item.quantity} x ${item.price/100}
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

  
//   const [allCartPurchases , setallCartPurchases ] = useState({});
//   const [cart, setCart] = useState([]);
//   const navigate = useNavigate;
  
//   const fetchCartProducts = async() => {
//     const products = await fetchCartProducts();
//     setallCartPurchases(products);
//   }
//   // useEffect(() => {
//   //   fetchCartProducts();
//   // }, [fetchCartProducts]);


//   const addProductToCart = (productId, quantity) => {
//     updateCartProduct(productId, quantity)
//       .then((updatedCart) => {
//         setCart(updatedCart);
//       })
//       .catch((error) => console.log(error));
//   };

//   const updatecartProduct = (product) => {
//     updateCartProduct(product.id, product.quantity)
//       .then((products) => {
//         setallCartPurchases (products);
//       })
//       .catch((error) => console.log(error));
//   };

//   const removeCartProduct = (cartProductId) => {
//     removeCartProduct(cartProductId)
//       .then((products) => {
//         setallCartPurchases (products);
//       })
//       .catch((error) => console.log(error));
//   };

//   const calculateTotalPrice = () => {
//     let price = 0;
//     if (Array.isArray(allCartPurchases )) {
//       allCartPurchases .forEach((product) => {
//         price += product.quantity * product.price;
//       });
//     }
//     return price;
//   };


//   const directToProduct = (productId) => {
//     return (event) => {
//       props.push(`/products/${productId}`);
//     };
//   };


//   let cartProductsLi;
//   if (allCartPurchases .length > 0) {
//     cartProductsLi = allCartPurchases .map((product) => {
//       return (
//         <li key={product.id}>
//           <div className="product-info">
//             <div className="product-pic-title">
//               <img
//                 src={product.imageUrls[0]}
//                 onClick={directToProduct(product.productId)}
//                 />
//               <div>
//                 <p onClick={directToProduct(product.productId)}>
//                   {product.productName}
//                 </p>
//                 <button
//                   className="clicky"
//                   onClick={() => removeCartProduct(product.id)}
//                   >
//                   <i className="Hit Me!" aria-hidden="true"></i>
//                 </button>
//               </div>
//             </div>

//             <div>
//               <input
//                 type="number"
//                 value={product.quantity}
//                 onChange={(e) =>
//                   updatecartProduct({ id: product.id, quantity: e.target.value })
//                 }
//                 />
//             </div>
//             <div className="price-column">
//               <h4>USD {product.price * product.quantity}</h4>
//               <p>USD {product.price} each</p>
//             </div>
//           </div>
//         </li>
//       );
//     });
//   } else {
//     cartProductsLi = <div>Your cart is empty</div>;
//   }
//   console.log("here it is", allCartPurchases)
  
//   return (
//     <div className="cart-container">
//     <ul className="cart-products-list">
//     <h2>{allCartPurchases .length} product(s) in your cart</h2>
//     {cartProductsLi}
//     </ul>
//     <div className="cart-total">
//     <h4>Total: USD {calculateTotalPrice()}</h4>
//     <Link to="/checkout">
//       <button className="checkout-btn">Checkout</button>
//     </Link>
//     </div>
//     </div>
//     );
// };

export default Cart;
