const express = require("express")
const productsRouter = express.Router();
const {
    createProduct, 
    getAllProducts,
    getProductById, 
    updateProduct, 
    deleteProduct
} = require("../db");

//! NEED TO MAKE ROUTER FOR ALL OF API
// !Need a requireUser function in Utils folder

// GET /api/products
productsRouter.get("/", async (req, res, next) => {
    try {
      const products = await getAllProducts();
      res.send(products);
    } catch (error) {
      next(error);
    }
  });

// POST /api/products
productsRouter.post("/", async (req, res, next) => {
    const {title, description, price} = req.body
    try {
      const product = await createProduct(title, description, price);
      if( product ){
        res.send({ product });
      }
    } catch (error) {
      next(error);
    }
  });
// PATCH /api/products/:productId
productsRouter.patch("/:productId", requireUser, async (req, res, next) => {
    const { id } = req.params
    const { title, description, price} = req.body

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

    try {
        const originalPost = await getProductById(id);
            if (originalPost.author.id === req.user.id) {
            const updatedProduct = await updateProduct(id, updateFields);
          res.send({ post: updatedProduct })
    }
    } catch (error) {
      next(error);
    }
  });

// DELETE /api/products/:productId
productsRouter.delete("/:productId", async (req, res, next) => {
    const id = req.params
    try {
        const deletedProduct = await deleteProduct(id) 
        res.send(deletedProduct)
    } catch (error) {
      next(error)
    }
})


