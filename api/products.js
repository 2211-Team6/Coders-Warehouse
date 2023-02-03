const express = require("express");
const { getReviewsByProductId } = require("../db/models/reviews");
const productsRouter = express.Router();
const {
    createProduct, 
    getAllProducts,
    getProductById, 
    updateProduct, 
    deleteProduct
} = require("../db/models/products");
const {requireUser} = require("./utils"
)

// GET /api/products
productsRouter.get("/", async (req, res, next) => {
    try {
      const products = await getAllProducts();
      res.send(products);
    } catch (error) {
      next(error);
    }
  });

  // GET /api/products/:productId
productsRouter.get("/:id", async (req, res, next) => {
  console.log("I actually work")
  const { id } = req.params
  try {
      const product = await getProductById(id) 
      const review = await getReviewsByProductId(id)
      res.send([product, review]);
  } catch (error) {
    next(error)
  }
})


module.exports = productsRouter;

