const getAllProductsByUser = require("../../../../controllers/products/getAllProductsByUser");

module.exports = async function(req, res){
    try {
        const objectUser = res.locals.userAuthorizate;

        //* Get all products by user controller
        const productsUser = await getAllProductsByUser(objectUser);
        
        //* Send responde with the products founded
        res.json({productsUser})
    } catch ({status, message}) {
        res.status(status ?? 500).json({
            error: message
        })
    };
};