const { Router } = require('express');
const getCategoryHandler = require('./handlers/userCategoryHandlers/getCategoryHandler');

const userCategoryRouter = Router();

//* Generate routes
userCategoryRouter.get('/:categoryId', getCategoryHandler);

//? Export the router
module.exports = userCategoryRouter;