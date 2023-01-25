// import React from "react";
// import { Link } from "react-router-dom";
// import { getCartItems } from "../../../db/models/cart";


// //This defines a class that is extended to our React.Component
// class cartItems extends React.Component {
//     //Using constructor the methods are bound to a class so we can use them in a class later on.
//   constructor() {
//     super();
//     this.handleRemoveCartItem = this.handleRemoveCartItem.bind(this);

//     this.handleUpdateCartItem = this.handleUpdateCartItem.bind(this);

//     this.calculateTotalPrice = this.calculateTotalPrice.bind(this);
//   }

//   //Called when the component is rendered and it invokes the fetchCartItems() function passed as a prop to the component.
//   componentDidMount() {
//     this.props.fetchCartItems();
//   }

//   // Takes in an item as a parameter and returns an anonymous function that updates the quantity of the item in the cart.
//   handleUpdateCartItem(item) {
//     return (event) => {
//       this.props.updateCartItem({
//         id: item.id,
//         quantity: event.target.value,
//       });
//     };
//   }

//   //Method that takes in a cart item id as a parameter and returns an anonymous function that removes that item from the cart.
//   handleRemoveCartItem(cartItemId) {
//     return (event) => {
//       this.props.removeCartItem(cartItemId);
//     };
//   }

//   //Calculates the total of all items in a cart by iterating through allCartItemsArray and multiplying the price of each item by quantity
//   calculateTotalPrice() {
//     let price = 0;
//     this.props.allCartItemsArray.forEach((item) => {
//       price += item.quantity * item.price;
//     });
//     return price;
//   }

//   //Method that takes productId as parameters, and returns an a function to redirect any user to teh product details page.
//   directToProduct(productId) {
//     return (event) => {
//       this.props.history.push(`/products/${productId}`);
//     };
//   }

//   render() {
//     let { allCartItemsArray } = this.props;
//     let cartItemsLi;
//     if (allCartItemsArray.length > 0) {
//       cartItemsLi = allCartItemsArray.map((item) => {
//         return (
//           <li key={item.id}>
//             <div className="item-info">
//               <div className="item-pic-title">
//                 <img
//                   src={item.imageUrls[0]}
//                   onClick={this.directToProduct(item.productId)}
//                 />
//                 <div>
//                   <p onClick={this.directToProduct(item.productId)} >
//                     {item.productName}
//                   </p>
//                   <button
//                     className="clicky"
//                     onClick={this.handleRemoveCartItem(item.id)}
//                   >
//                     <i className="fa fa-trash" aria-hidden="true"></i>
//                   </button>
//                 </div>
//               </div>

//               <div>
//                 <input
//                   type="number"
//                   value={item.quantity}
//                   onChange={this.handleUpdateCartItem(item)}
//                 />
//               </div>
//               <div className="price-column">
//                 <h4>USD {item.price * item.quantity}</h4>
//                 <p>USD {item.price} each</p>
//               </div>
//             </div>
//           </li>
//         );
//       });
//     } else {
//       cartItemsLi = <div>Your cart is empty</div>;
//     }

//     return (
//       <div className="cart-items-checkout">
//         <ul className="cart-items-list">
//           <h2>{allCartItemsArray.length} item(s) in your cart</h2>
//           {cartItemsLi}
//         </ul>

//         <ul className="checkout">
//           <div className="items-total">
//             <li>
//               <span>Item(s) total</span>
//               <span>USD {this.calculateTotalPrice()}</span>
//             </li>
//             {/* Additional checkout code */}
//           </div>
//         </ul>
//       </div>
//     );
//   }
// }
