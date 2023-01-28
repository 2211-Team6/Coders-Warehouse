import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Cart = ({cartItems, setCartItems, addToCart}) => {
  console.log("This is cart Items", cartItems)
  const itemsPrice = cartItems.reduce((a, c) => a + c.price/100 * c.quantity, 0);
  const taxPrice = itemsPrice * 0.053;
  const shippingPrice = itemsPrice > 35 ? 0 : 10;
  const totalPrice = itemsPrice + taxPrice + shippingPrice

  const removeFromCart = (item) => {
    const exists = cartItems.find((product) => product.id === item.id)
    if(exists.quantity === 1){
      setCartItems(cartItems.filter((product) => product.id !== item.id))
    }else {
      setCartItems(
        cartItems.map((product) => 
        product.id === item.id ? { ...exists, quantity: exists.quantity -1 } : product)
      )
    }
  }

  return (
    <div>
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
