const express = require("express");
const cartRouter = express.Router();
const { getCartByUserId, addProductToCart, deleteProductFromCart, } = require("../db/models/cart")

// GET / api/cartProducts

cartRouter.get("/:id", async (req, res, next) => {
    console.log("getting the cart")
    const { id } = req.params;
    try {
        console.log("This is the req.params id", id)
        const cartProducts = await getCartByUserId(id);
        console.log("Here's what I got from cart API", cartProducts)
        res.send([cartProducts])
    } catch (error) {
        next(error)
    }
})

// POST /api/cartProducts = this adds a new cart item
    cartRouter.post("/", async (req, res) => {
        try {
            const {id, productId, quantity} = req.body;
            const cartProduct = await addProductToCart({id, productId, quantity})
            res.send(cartProduct)
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

// // GET / api/cartProducts
// cartRouter.get ("/", async (req, res) => {
//     try {
//         const cartProducts = await getcartProducts()
//         res.send({ cartProducts })
//     } catch (error) {
//         next({error})
//     }
// });

// // POST /api/cartProducts = this adds a new cart item
// cartRouter.post("/", async (req, res) => {
//     try {
//         const {product_id, quantity} = req.body; 
//         const cartProduct = await addcartProduct(product_id, quantity);
//         res.send(cartProduct)
//     } catch (error) {
//         next({error});
//     }
// });

// // PATCH / api/cart = update an existing cart item
// cartRouter.patch("/:id", async (req, res) => {
//     try {
//         const {id} = req.params;
//         const {product_id, quantity} = req.body;
//         const cartProduct = await updatecartProduct(id, product_id, quantity);
//         res.send(cartProduct)
//     } catch(error) {
//         next(error)
//     }
// });

// // DELETE / api/cart
// cartRouter.delete("/:id", async (req, res) => {
//     try {
//         const {id} = req.params;
//         const cartProduct = await deletecartProduct(id);
//         res.send(cartProduct)
//     } catch (error) {
//         next(error)
//     }
// })



module.exports = cartRouter