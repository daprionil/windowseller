const { Router } = require('express');
const v1RootRouter = require('./v1/v1Router');

const rootRouter = Router();

//! Define middleware and other routes
rootRouter.use('/v1',v1RootRouter);

//? Export router
module.exports = rootRouter;