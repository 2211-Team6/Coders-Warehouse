const express = require("express");
const cartRouter = express.Router();
const { getCartByUserId, addProductToCart, deleteProductFromCart, attachProductsToCart, updateCartQuantity, } = require("../db/models/cart")

// GET / api/cartProducts

cartRouter.get("/:id", async (req, res, next) => {
    const { id } = req.params
    try {
        const cart = await getCartByUserId(id);
        const cartIds = cart.map((product) => product.productId)
        const cartQuantities = cart.map((product) => product.quantity) 
        const cartProducts = await Promise.all(cartIds.map(attachProductsToCart))
        res.send({cartProducts, cartQuantities});
    } catch (error) {
        next(error)
    }
})

// POST /api/cart
    cartRouter.post("/add", async (req, res, next) => {
        try {
            const {id, productId, quantity} = req.body;
            const cartProduct = await addProductToCart({id, productId, quantity})
            res.send(cartProduct)
        } catch (error) {
            next(error);
        }
    })

// PATCH /api/cart/patch
    cartRouter.patch("/patch", async (req, res, next) => {
    console.log("made it to the backend")
    try {
        const { id, productId, quantity } = req.body;
        console.log("Here is the productId and quantity in the api", id, productId, quantity)
        const updatedProduct = await updateCartQuantity(id, productId, quantity)
        console.log("Here is the updated Product", updatedProduct)
        res.send(updatedProduct)
    } catch (error) {
        next(error);
    }
})

// DELETE / api/cart
cartRouter.delete("/:productId", async (req, res) => {
    try {
        const {productId} = req.params;
        const cartProduct = await deleteProductFromCart(productId);
        res.send(cartProduct)
    } catch (error) {
        next(error)
    }
})

module.exports = cartRouter