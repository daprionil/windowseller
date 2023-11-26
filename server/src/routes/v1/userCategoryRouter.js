const { Router } = require('express');
const getCategoryHandler = require('./handlers/userCategoryHandlers/getCategoryHandler');
const createCategoryHandler = require('./handlers/userCategoryHandlers/createCategoryHandler');
const getAllCategoriesHandler = require('./handlers/userCategoryHandlers/getAllCategoriesHandler');
const updateACategoryHandler = require('./handlers/userCategoryHandlers/updateACategoryHandler');
const deleteACategoryHandler = require('./handlers/userCategoryHandlers/deleteACategoryHandler');

const userCategoryRouter = Router();

//* Generate routes
userCategoryRouter.get('/:categoryId', getCategoryHandler);

userCategoryRouter.get('/', getAllCategoriesHandler);
userCategoryRouter.post('/', createCategoryHandler);
userCategoryRouter.put('/:categoryId', updateACategoryHandler);
userCategoryRouter.delete('/:categoryId', deleteACategoryHandler);

//? Export the router
module.exports = userCategoryRouter;