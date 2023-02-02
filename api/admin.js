const express = require("express");
const { getAllUsers } = require("../db/users");
const {createProduct, updateProduct, deleteProduct} = require("../db/models/products")
const adminRouter = express.Router();

adminRouter.get("/", async (req, res, next) => {
    console.log("made it to the admin api")
    try {
        const users = await getAllUsers();
        console.log("Here are the users", users)
        res.send(users)
    } catch (error) {
        console.log("Error getting all Users")
        next(error)
    }
})

// POST /api/admin
adminRouter.post("/newProduct", async (req, res, next) => {
    const {title, description, price, quantity, url} = req.body
    console.log("here's the req.body in API", title, description, price, quantity, url)
    try {
      const product = await createProduct({title, description, price, quantity, url});
      console.log("Here's the product", product)
      if( product ){
        res.send(product);
      }
    } catch (error) {
      next(error);
    }
  });

  // PATCH /api/admin/:productId
  adminRouter.patch("/:productId", async (req, res, next) => {
      const id  = req.params.productId
      console.log("this is id", id)
    const { title, description, price, quantity, url} = req.body

    const updateFields = {}

    if (title){
        updateFields.title = title
    }

    if (description){
        updateFields.description = description
    }

    if (price){
        updateFields.price = price
    }

    if (quantity){
      updateFields.quantity = quantity
    }

    if (url){
        updateFields.url = url
      }

    try {
        console.log("attempting to update product in API", id, updateFields)
        const updatedProduct = await updateProduct(id, updateFields);
        console.log("here's what i got back in API", { updatedProduct })
          res.send({ updatedProduct })
    }catch (error) {
      next(error);
    }
})

// DELETE /api/admin/:productId
adminRouter.delete("/:productId", async (req, res, next) => {
    const id = req.params.productId
    console.log("here's the id in adminRouter", id)
    try {
        const deletedProduct = await deleteProduct(id) 
        console.log("here's the deleted product", deletedProduct)
        res.send(deletedProduct)
    } catch (error) {
      next(error)
    }
})

module.exports = adminRouter