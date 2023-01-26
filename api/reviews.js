const express = require('express');
const router = express.Router();
const { createReview, getAllReviews } = require('../db');
const { requireUser } = require('./utils');


// GET /api/reviews
router.get("/", async (req, res, next) => {
    try {
      const allReviews = await getAllReviews();
  
      res.send(allReviews);
    } catch ({ name, message }) {
      next({ name, message });
    }
  });


  router.get("/", async (req, res, next) => {
    try {
      const allReviews = await getAllReviews();
  
      res.send(allReviews);
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

  
// POST /api/reviews
router.post("/", async (req, res, next) => {
    const { id, username, productId, rating, description } = req.body;
    const reviewsData = {};
    try {
      reviewsData.username = username;
      reviewsData.productId = productId;
      reviewsData.rating = rating;
      reviewsData.description = description;
      reviewsData.id = req.user.id;
      if(req.user) {
        req.body.id = req.user.id;
      }
      const review = await createReview(reviewsData);
      res.send(review);
    } catch ({ name, message }) {
      next({ name, message });
    }
  });


  module.exports = router