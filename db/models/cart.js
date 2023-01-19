const client = require('../client');


const getCartItems = async () => {
    try {
        const { rows } = await client.query(`
        SELECT * FROM cart_items
        `)
        return rows;
    } catch (error) {
        console.log(error);
        throw error
    }
}

const addCartItem = async (product_id, quantity) => {
    try {
        const { rows } = await client.query(`
        INSERT INTO cart_items (product_id, quantity) 
        VALUES ($1, $2) 
        RETURNING *;
        `, [product_id, quantity])
        return rows[0]
    } catch (error) {
        console.log(error)
        throw error;
    }
}

const updateCartItem = async (id, product_id, quantity) => {
    try {
        const {rows} = await client.query(`
        UPDATE cart_items
        SET product_id = $1, quantity = $2
        WHERE id = $3
        RETURNING *;
        ` [ id,product_id, quantity])
    } catch (error) {
        console.log(error)
        throw error;
    }
}

const deleteCartItem = async (id) => {
    try {
        const {rows} = await client.query(`
        DELETE FROM cart_items
        WHERE id = $1
        RETURNING *;
        `[id])
        return rows[0]
    } catch (error) {
        console.log(error)
        throw error;
    }
}

module.exports = {
    getCartItems,
    addCartItem,
    updateCartItem,
    deleteCartItem
}