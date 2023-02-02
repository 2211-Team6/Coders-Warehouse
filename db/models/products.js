const client = require("../client");

async function createProduct({title, description, price, quantity, url}){
    console.log("Hit the DB")
    try {
        const {
          rows: [product],
        } = await client.query(
          `
        INSERT INTO products(title, description, price, quantity, url)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `,
          [title, description, price, quantity, url]
        );
        console.log("Here's the new Products", product)
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

async function updateProduct(id, ...fields){
    const setString = Object.keys(fields[0])
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  if (setString.length === 0) {
    return;
  }
  console.log("Made it to the db for updated. Here's the fields", fields)
  console.log("object.keys and .values", Object.keys(fields[0]), Object.values(fields[0]))
  console.log("here's the setString", setString)
    try {
        const { rows : [ product ]} = await client.query(
            `
            UPDATE products
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
            `, 
            Object.values(fields[0])
        );
        console.log("here is the updated product", product)
        return product;
    } catch (error) {
        console.log("Error updating Product")
        console.error(error)
    }
}

async function deleteProduct(id){
    try {
        console.log("Hit the DB for delete")
        const { rows : { product }} = await client.query(
            `
            DELETE FROM products
            WHERE id = $1
            `, [id]
        );
        console.log("Going, going, gone!")
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