const BASE_URL = "https://coders-warehouse-6.fly.dev/api";
// const BASE_URL = "/api"

export const registerUser = async (username, password, email) => {
  try {
    console.log(username, password, email);
    const response = await fetch(`${BASE_URL}/users/register`, {
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
    return result.token;
  } catch (error) {
    console.error(error);
  }
};

export const login = async (username, password) => {
  console.log("Here is your username and password in authjs", username, password)
  try {
    const verify = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        username,
        password,
       }),
    });
    console.log("Here is result", verify)
    if(verify.status === 500){
      alert("Username or password is incorrect")
      return;
    }
    const data = await verify.json();
    console.log("Here is data", data)
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.user.username);
    console.log("Here is data.token", data.token)
    return data.token;
  } catch (error) {
    console.error(error);
  }
};

export const fetchMe = async (token) => {
  try {
    const response = await fetch(
      `${BASE_URL}/users/me`, {
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
        `${BASE_URL}/products`,
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
        `${BASE_URL}/products/${id}`,
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




//************ REVIEWS ************//

export const addReview = async (name, userName, productId, rating, description) => {
  const token = localStorage.getItem("token");
  console.log("this is name from auth: ", name);
  try {
    const response = await fetch(`${BASE_URL}/reviews/reviews-form`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
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
    const response = await fetch(`${BASE_URL}/reviews`);
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export async function deleteReview(id, token) {
  try{
  const response = await fetch(`${BASE_URL}/reviews/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
} catch (error) {
throw error;
};
}

 export const getReviewsByProductId = async (id) => {
    try {
      const response = await fetch(
        `${BASE_URL}/products/${id}`,
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
        `${BASE_URL}/cart/${id}`,
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
        `${BASE_URL}/cart`,
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
      console.log("Here is the result in addCartProduct", newCartProduct)
      return newCartProduct;
    } catch (error){
      console.log(error);
    }
  };

  export async function updateCartProduct(id, productId, quantity){
    console.log("trying to call the api for updatedCartProduct")
    try {
      const response = await fetch(`${BASE_URL}/cart/patch`, {
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
      const response = await fetch(`${BASE_URL}/cart/${productId}`, {
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


  
//   //************ CHECKOUT ************//

  export async function fetchCheckout(cartProduct, shippingDetails, billingDetails) {
    try {
      const response = await fetch(`${BASE_URL}/checkout`, {
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


  //   //************ ADMIN ************//

  export async function getAllUsers(user) {
    if(user.isAdmin === true){
      try {
        const response = await fetch(`${BASE_URL}/admin`, {
          header: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        return result
      }catch (error) {
        console.log(error);
      }
  } else {
    return (alert("404: Unauthorized"))
  }
  }

  export const createProduct = async (
    token,
    title,
    description,
    price,
    quantity,
    url,
    user
  ) => {
    console.log("hit the auth js call")
    if(user.isAdmin === true){
      try {
        console.log("attempting to make a product")
        const response = await fetch(`${BASE_URL}/admin/newProduct`, {
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
            url,
          }),
        });
        const result = await response.json();
        return result;
      } catch (error) {
        console.log(error);
      }
  }else{
    return (alert("404: Unauthorized"))
  }
  };
  
  export const updateProduct = async (
    id, 
    token,
    title,
    description,
    price,
    quantity,
    url
  ) => {
    console.log("Hit the auth.js")
    try {
      const response = await fetch(`${BASE_URL}/admin/${id}`, {
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
          url,
        }),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
    }
  };
  
  export const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`${BASE_URL}/admin/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
    }
  };
  
