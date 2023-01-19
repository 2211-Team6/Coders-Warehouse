const express = require("express");
const cartRouter = express.Router();
const { getCartItems, addCartItem, updateCartItem, deleteCartItem, } = require("../db/models/cart")


// GET / api/cartItems
cartRouter.get ("/", async (req, res) => {
    try {
        const cartItems = await getCartItems()
        res.send({ cartItems })
    } catch (error) {
        next({error})
    }
});

// POST /api/cartItems = this adds a new cart item
cartRouter.post("/", async (req, res) => {
    try {
        const {product_id, quantity} = req.body; 
        const cartItem = await addCartItem(product_id, quantity);
        res.send(cartItem)
    } catch (error) {
        next({error});
    }
});

// PATCH / api/cart = update an existing cart item
cartRouter.patch("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {product_id, quantity} = req.body;
        const cartItem = await updateCartItem(id, product_id, quantity);
        res.send(cartItem)
    } catch(error) {
        next(error)
    }
});

// DELETE / api/cart
cartRouter.delete("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const cartItem = await deleteCartItem(id);
        res.send(cartItem)
    } catch (error) {
        next(error)
    }
})



module.exports = cartRouter