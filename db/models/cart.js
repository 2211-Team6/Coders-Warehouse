const client = require("../client");

const addProductToCart = async ({id, productId, quantity}) => {
    try {
        const { rows : [product] } = await client.query(`
        INSERT INTO cart
        VALUES ($1, $2, $3)
        RETURNING *
        `, [id, productId, quantity])
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
      return products;
    } catch (error) {
      console.error("error attaching product to cart");
      throw error;
    }
  }

  async function updateCartQuantity(id, productId, quantity){
    console.log("Hit the db function")
    console.log("here are the params", id, productId, quantity)
        try {
            const { rows } = await client.query(`
            UPDATE cart
            SET quantity = $3
            WHERE id = $1 AND "productId" = $2
            `, [ id, productId, quantity ])
            console.log("this is rows", rows)
            return rows;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
    



module.exports = {
    addProductToCart,
    getCartByUserId,
    deleteProductFromCart,
    attachProductsToCart,
    updateCartQuantity,
   
}