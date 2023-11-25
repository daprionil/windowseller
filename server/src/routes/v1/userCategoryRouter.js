const { Router } = require('express');
const getCategoryHandler = require('./handlers/userCategoryHandlers/getCategoryHandler');
const createCategoryHandler = require('./handlers/userCategoryHandlers/createCategoryHandler');

const userCategoryRouter = Router();

//* Generate routes
userCategoryRouter.get('/:categoryId', getCategoryHandler);
userCategoryRouter.post('/', createCategoryHandler);

//? Export the router
module.exports = userCategoryRouter;