const { Router } = require('express');
const userRouter = require('./userRouter.js');

const v1RootRouter = Router();
//! Define middleware and other routes

v1RootRouter.use('/users', userRouter);

//? Export router
module.exports = v1RootRouter;
