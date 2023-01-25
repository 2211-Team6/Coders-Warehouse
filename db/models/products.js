const client = require("../client");

async function createProduct({title, description, price, quantity}){
    try {
        const {
          rows: [product],
        } = await client.query(
          `
        INSERT INTO products(title, description, price, quantity)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
          [title, description, price, quantity]
        );
        return product;
      } catch (error) {
        console.error("Error creating product");
        throw error;
      }
}

async function getAllProducts(){
    try {
        const { rows: products } = await client.query(
            `
            SELECT * 
            FROM products
            `
        ); return products;
    } catch (error) {
        console.log("Error getting all products")
        console.error(error)
    }
}

async function getProductById(id){
    try {
        const { rows } = await client.query(`
        SELECT *
        FROM products
        WHERE id = ${id}
        `);
        return rows;
    } catch (error) {
        console.log("Error getting product by Id")
        console.error(error)
    }
}

async function updateProduct({id, ...fields}){
    const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  if (setString.length === 0) {
    return;
  }
    try {
        const { rows : { product }} = await client.query(
            `
            UPDATE products
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
            `, 
            Object.values(fields)
        );
        return product;
    } catch (error) {
        console.log("Error updating Product")
        console.error(error)
    }
}

// Probably needs to be updated based on where product is attached?
async function deleteProduct(id){
    try {
        const { rows : { product }} = await client.query(
            `
            DELETE FROM products
            WHERE id = $1
            `, [id]
        );
        return product;
    } catch (error) {
        console.log("Error deleting Product")
        console.error(error)
    }
}

module.exports = {
    createProduct, 
    getAllProducts,
    getProductById, 
    updateProduct, 
    deleteProduct
}