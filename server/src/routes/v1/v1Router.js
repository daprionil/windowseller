const { Router } = require('express');
const UserRouter = require('./UserRouter');

const v1RootRouter = Router();
//! Define middleware and other routes

v1RootRouter.use('/users', UserRouter);

//? Export router
module.exports = v1RootRouter;
