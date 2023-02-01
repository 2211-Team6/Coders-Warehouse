const client = require("../client");


// const getCart = async () => {
//     try {
//         const { rows } = await client.query(`
//         SELECT * FROM cart
//         `)
//         return rows;
//     } catch (error) {
//         console.log(error);
//         throw error
//     }
// }

const addProductToCart = async ({id, productId, quantity}) => {
    // console.log("Heres the cart parameters", userId, productId, quantity)
    try {
        const { rows : [product] } = await client.query(`
        INSERT INTO cart
        VALUES ($1, $2, $3)
        RETURNING *
        `, [id, productId, quantity])
        // console.log("I added this to your cart", rows)
        return product
    } catch (error) {
      console.error("error adding product to cart")
      throw error
    }
}

async function getCartByUserId(id) {
    try {
      const {
        rows: cart
      } = await client.query(
        `
      SELECT * FROM cart
      WHERE id = ${id}
    `
      );
      console.log("Here's your cart", cart)
      return cart;
    } catch (error) {
      console.error("error getting cart by Id");
      throw error;
    }
  }

  async function deleteProductFromCart(productId) {
    try {
      const {
        rows: [cart],
      } = await client.query(
        `
        DELETE FROM cart
        WHERE "productId" = $1
        RETURNING *
        `,
        [productId]
      );
      return cart;
    } catch (error) {
      console.error("error deleting product from cart");
      throw error;
    }
  }

  async function attachProductsToCart(productId) {
    try {
      const { rows: [products] } = await client.query(`
      SELECT products.* FROM products
      JOIN cart ON cart."productId" = products.id
      WHERE "productId" = $1
      `, [productId])
      console.log("these are the attached products", products)
      return products;
    } catch (error) {
      console.error("error attaching product to cart");
      throw error;
    }
  }


// const addCartItem = async (product_id, quantity) => {
//     try {
//         const { rows } = await client.query(`
//         INSERT INTO cart_items (product_id, quantity) 
//         VALUES ($1, $2) 
//         RETURNING *;
//         `, [product_id, quantity])
//         return rows
//     } catch (error) {
//         console.log(error)
//         throw error;
//     }
// }

// const updateCartItem = async (id, quantity) => {
//     try {
//         const {rows} = await client.query(`
//         UPDATE cart_items
//         SET quantity = $1
//         WHERE id = $2
//         RETURNING *;
//         ` [ id, quantity])
//         return rows;
//     } catch (error) {
//         console.log(error)
//         throw error;
//     }
// }

// const deleteCartItem = async (id) => {
//     try {
//         const {rows} = await client.query(`
//         DELETE FROM cart_items
//         WHERE id = $1
//         RETURNING *;
//         `[id])
//         return rows
//     } catch (error) {
//         console.log(error)
//         throw error;
//     }
// }

module.exports = {
    // getCartItems,
    addProductToCart,
    getCartByUserId,
    deleteProductFromCart,
    attachProductsToCart,
    // addCartItem,
    // updateCartItem,
    // deleteCartItem
}