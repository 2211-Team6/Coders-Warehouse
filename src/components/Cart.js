import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { updateCartProduct, removeCartProduct, fetchCartProducts} from "../api/auth"
import { useStateValue } from "../Helpers/StateProvider";

const cart = (props) => {
  const [{ cart }, dispatch] = useStateValue();

  const fetchCartProducts = () => {
    fetchCartProducts().then((items) => {
      console.log(items);
      setAllCartProductsArray(items);
    });
  };

  useEffect(() => {
    fetchCartProducts();
  }, []);

  // const fetchcartProducts = () => {
  //   e.preventDefault();
  //   fetchcartProducts().then((items) => {
  //     console.log(items)
  //     setAllcartProductsArray(items);
  //   });
  // };

  const updatecartProduct = (product) => {
    fetchCartProducts(product.id, product.quantity)
      .then((products) => {
        setAllcartProductsArray(products);
      })
      .catch((error) => console.log(error));
  };

  const removeCartProduct = (cartProductId) => {
    updatecartProduct(cartProductId)
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

  return (
    <div className="cart-container">
    <ul className="cart-products-list">
    <h2>{allCartProductsArray.length} product(s) in your cart</h2>
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
