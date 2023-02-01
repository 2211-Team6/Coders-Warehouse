export const registerUser = async (username, password, email) => {
  try {
    console.log(username, password, email);
    const response = await fetch("/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        email,
      }),
    });
    const result = await response.json();
    console.log(result);
    return result.token;
  } catch (error) {
    console.error(error);
  }
};

export const login = async (username, password) => {
  console.log("Here is your username and password in authjs", username, password)
  try {
    const verify = await fetch(`/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({  user: {
        username,
        password,
      } }),
    });
    const data = await verify.json();
    // right here put the returned data.token into localStorage so that we can use it across our app.
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.user.username);
    return data.token;
  } catch (error) {
    console.error(error);
  }
};

export const fetchMe = async (token) => {
  try {
    const response = await fetch(
      `/api/users/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

//************ PRODUCTS ************//

export const getAllProducts = async () => {

    try {
      const response = await fetch(
        "/api/products",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      return result;
    } catch (error) {
      // console.log(error);
    }
  };


  export const getProductById = async (id) => {
    try {
      const response = await fetch(
        `/api/products/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      return result[0];
    } catch (error) {
      console.log(error);
    }
  };


export const createProduct = async (
  token,
  title,
  description,
  price,
  quantity
) => {
  try {
    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        description,
        price,
        quantity,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (
  token,
  title,
  description,
  price,
  quantity,
  id
) => {
  try {
    const response = await fetch(`/api/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        description,
        price,
        quantity,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (token, productId) => {
  try {
    const response = await fetch(`/api/products/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

//************ REVIEWS ************//

export const addReview = async (userName, productId, rating, description) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch("/api/reviews/reviews-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userName,
        productId,
        rating,
        description,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};


export const getReviews = async () => {
  try {
    const response = await fetch("/api/reviews");
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export async function deleteReview(id, token) {
  const response = await fetch(`/api/reviews/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
}

 export const getReviewsByProductId = async (id) => {
    try {
      const response = await fetch(
        `/api/products/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      return result[1];
    } catch (error) {
      console.log(error);
    }
  }; 

  //************ CART ************//

  export const fetchCart = async (id) => {
    console.log("This is the id in fetchcart auth.js", id)
     try {
      const response = await fetch(
        `/api/cart/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
            // body: JSON.stringify({
            //   id
            // }),
        });
      console.log("Here is the response in fetchcart auth.js", response)
      const result = await response.json();
      console.log("Here is the result in fetchcart auth.js", result)
      return result;
    } catch (error) {
      // console.log(error);
    }
  };

  export async function addCartProduct(id, productId, quantity) {
    console.log("Here is the id, PId, Q in addCartProduct auth.js", id, productId, quantity)
    const token = localStorage.getItem("token")
    try {
      const response = await fetch(
        "/api/cart/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
            body: JSON.stringify({ 
              id, 
              productId, 
              quantity,
            }),
          },
      );
      console.log("Here is the response in addCartProduct", response)
      const newCartProduct = await response.json();
      console.log("Here is the result in addCartProduct", result)
      return newCartProduct;
    } catch (error){
      console.log(error);
    }
  };

  export async function updateCartProduct(id, productId, quantity){
    console.log("trying to call the api for updatedCartProduct")
    try {
      const response = await fetch(`/api/cart/patch`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json",
       },
        body: JSON.stringify({
          id,
          productId, 
          quantity,
        }),
      });
      console.log("Here's the response", response)
      const updatedProduct = await response.json();
      console.log("Here's the updatedProduct", updatedProduct)
      return updatedProduct
    } catch (error) {
      console.log(error);
    }
}


  export async function removeCartProduct(productId){
    console.log("Here is the product Id in remove auth.js", productId)
    try {
      const response = await fetch(`/api/cart/${productId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      console.log("This is the response in removeCartProduct", response)
      const result = await response.json();
      console.log("Here is the result", result)
      return result
    } catch (error) {
      console.log(error);
    }
  };

//   export const calculateTotalPrice = async (token) => {
//     try {
//         const response = await fetch(`/api/calculateTotalPrice`, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             }
//         });
//         const result = await response.json();
//         return result;
//     } catch (error) {
//         // console.log(error);
//     }
// };


  
//   //************ CHECKOUT ************//

  export async function fetchCheckout(cartProduct, shippingDetails, billingDetails) {
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart: cartProduct,
          shippingDetails: shippingDetails,
          billingDetails: billingDetails,
        }),
      });
      const result = await response.json();
      return result
    } catch (error) {
      console.log(error);
    }
  }

