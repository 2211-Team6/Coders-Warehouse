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
    cartRouter.post("/", async (req, res, next) => {
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