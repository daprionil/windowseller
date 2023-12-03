const { Router } = require('express');
const getAProductHandler = require('./handlers/userProductsHandlers/getAProductHandler');
const updateProductHandler = require('./handlers/userProductsHandlers/updateProductHandler');
const createProductHandler = require('./handlers/userProductsHandlers/createProductHandler');
const getEveryProductsHandler = require('./handlers/userProductsHandlers/getEveryProductsHandler');
const deleteProductHandler = require('./handlers/userProductsHandlers/deleteProductHandler');
const removeProductsHandler = require('./handlers/userProductsHandlers/removeProductsHandler');

//* Create router
const userProductRouter = Router();

//* Create routes
userProductRouter.route('/:productId')
    .get(getAProductHandler)//Get a product
    .put(updateProductHandler)// Update a product

userProductRouter.route('/')
    .post(createProductHandler)//Create a product
    .get(getEveryProductsHandler)//Get all products by user
    .delete(deleteProductHandler);//Deleted products

userProductRouter.post('/remove', removeProductsHandler);//Remove some products - change the boolean property deleted

//* Export router
module.exports = userProductRouter;