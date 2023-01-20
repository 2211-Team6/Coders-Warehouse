// const apiRouter = require('express').Router();
const express = require("express");
const apiRouter = express.Router();


apiRouter.get('/', (req, res, next) => {
  res.send({
    message: 'API is under construction!',
  });
});

apiRouter.get('/health', (req, res, next) => {
  res.send({
    healthy: true,
  });
});

// place your routers here
// const usersRouter = require('./user');
// apiRouter.use('/user', usersRouter);

// const reviewsRouter = require('./reviews');
// apiRouter.use('/reviews', reviewsRouter);



module.exports = apiRouter;
