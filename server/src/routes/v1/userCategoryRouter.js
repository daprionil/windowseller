const { Router } = require('express');
const getCategoryHandler = require('./handlers/userCategoryHandlers/getCategoryHandler');
const createCategoryHandler = require('./handlers/userCategoryHandlers/createCategoryHandler');
const getAllCategoriesHandler = require('./handlers/userCategoryHandlers/getAllCategoriesHandler');

const userCategoryRouter = Router();

//* Generate routes
userCategoryRouter.get('/:categoryId', getCategoryHandler);
userCategoryRouter.post('/', createCategoryHandler);
userCategoryRouter.get('/', getAllCategoriesHandler);

//? Export the router
module.exports = userCategoryRouter;