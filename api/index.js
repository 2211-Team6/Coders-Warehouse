const apiRouter = require('express').Router();

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
const usersRouter = require('./user');
apiRouter.use('/user', usersRouter);

//ROUTER: /api/cart
const cartRouter = require('./cart');
apiRouter.use('./cart', cartRouter);

// ROUTER: /api/products
const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);

// ROUTER: /api/reviews
const reviewsRouter = require('./reviews');
apiRouter.use('/reviews', reviewsRouter);


module.exports = apiRouter;
