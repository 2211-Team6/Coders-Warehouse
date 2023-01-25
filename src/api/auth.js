export const registerUser = async (username, password) => {
    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const result = await response.json();
      return result.token;
    } catch (error) {
      console.error(error);
    }
  };
  export const login = async (username, password) => {
    try {
      const verify = await fetch(`/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await verify.json();
      console.log(data);
      // right here put the returned data.token into localStorage so that we can use it across our app.
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.user.username);
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
      console.log("Result line 52:", result)
      return result;
    } catch (error) {
      console.log(error);
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
      return result;
    } catch (error) {
      console.log(error);
    }
  };


  export const createProduct = async (token, title, description, price, quantity) => {
    try {
      const response = await fetch(
        "/api/products",
        {
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
        }
      );
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
    }
  };


  export const updateProduct = async (token, title, description, price, quantity, id) => {
    try {
      const response = await fetch(
        `/api/products/${id}`,
        {
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
        }
      );
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
    }
  };


  export const deleteProduct = async (token, productId) => {
    try {
      const response = await fetch(
        `/api/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
      const response = await fetch(
        "/api/reviews",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userName,
            productId,
            rating,
            description
          }),
        }
      );
      const result = await response.json();
    //   console.log("whyyyyyyyyyyyyy", result);
      return result;
    } catch (error) {
      throw error;
    }
  };

  
export const getReviews = async () => {
    try {
      const response = await fetch(
        "/api/reviews"
      );
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


  //************ CART ************//

  export async function fetchCartProducts(cartProduct) {
     try {
      const response = await fetch(
        "/api/cart",
        {
          headers: {
            "Content-Type": "application/json",
            body: JSON.stringify(cartProduct),
          },
        }
      );
      const result = await response.json();
      return result;
    } catch (error) {
      // console.log(error);
    }
  };

  export async function updateCartProduct(cartProduct){
    try {
      const response = await fetch(`/api/cart/${cartProduct.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartProduct),
      });
      if(response.ok) {
        fetchcartProducts();
      } else {
        console.log(`Error: ${response.status}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  export async function removeCartProduct(cartProductId){
    try {
      const response = await fetch(`/api/cart/${cartProductId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if(response.ok) {
        fetchcartProducts();
      } else {
        console.log(`Error: ${response.status}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  