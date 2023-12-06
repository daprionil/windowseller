const deleteProduct = require("../../../../controllers/products/deleteProduct");
const CustomErrors = require("../../../../utils/errors/CustomErrors");

module.exports = async function(req, res){
    try {
        const { productsToDelete } = req.body;
        const objectUser = res.locals.userAuthorizate;

        //* If the value in the body is not an array
        const validateIsArray = Array.isArray(productsToDelete);
        if(!validateIsArray){
            throw CustomErrors.SintaxError('El productsToDelete debe ser un arreglo de números');
        }

        //* If not exist values in the array list
        if(!productsToDelete?.length){
            throw CustomErrors.EmptyError('La lista de elementos está vacía');
        };

        //* If the values in the array does not a numbers
        const existNumbers = productsToDelete.some( n => isNaN(n));
        if(existNumbers){
            throw CustomErrors.SintaxError('Los valores de la lista deben ser Id\'s de números');
        }

        //* Change delete attribute in each product by id
        const countProductsDeleted = await deleteProduct(productsToDelete, objectUser);
        
        //? Send request to the client
        res.json({countProductsDeleted});
    } catch ({status, message}) {
        res.status(status ?? 500).json({
            error: message
        })
    };
};