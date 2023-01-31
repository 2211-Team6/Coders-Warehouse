const express = require("express");
const cartRouter = express.Router();
const { getcartProducts, addcartProduct, updatecartProduct, deletecartProduct, } = require("../db/models/cart")


// GET / api/cartProducts
cartRouter.get ("/", async (req, res, next) => {
    const { product_id } = req.params;
    try {
        const cartProducts = await getcartProducts({ id: product_id});
        res.send({ cartProducts })
    } catch (error) {
        next({error})
    }
});

// POST /api/cartProducts = this adds a new cart item
cartRouter.post("/", async (req, res) => {
    try {
        const {product_id, quantity} = req.body; 
        const cartProduct = await addcartProduct(product_id, quantity);
        res.send(cartProduct)
    } catch (error) {
        next({error});
    }
});

// PATCH / api/cart = update an existing cart item
cartRouter.patch("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {product_id, quantity} = req.body;
        const cartProduct = await updatecartProduct(id, product_id, quantity);
        res.send(cartProduct)
    } catch(error) {
        next(error)
    }
});

// DELETE / api/cart
cartRouter.delete("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const cartProduct = await deletecartProduct(id);
        res.send(cartProduct)
    } catch (error) {
        next(error)
    }
})



module.exports = cartRouter