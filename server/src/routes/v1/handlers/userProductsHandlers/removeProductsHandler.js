const removeProducts = require("../../../../controllers/products/removeProducts");
const CustomErrors = require("../../../../utils/errors/CustomErrors");

module.exports = async function(req, res){
    try {
        const { productsRemove } = req.body;
        const objectUser = res.locals.userAuthorizate;

        //* If the value in the body is not an array
        const validateIsArray = Array.isArray(productsRemove);
        if(!validateIsArray){
            throw CustomErrors.SintaxError('El productsRemove debe ser un arreglo de números');
        }

        //* If not exist values in the array list
        if(!productsRemove?.length){
            throw CustomErrors.EmptyError('La lista de elementos está vacía');
        };

        //* If the values in the array does not a numbers
        const existNumbers = productsRemove.some( n => isNaN(n));
        if(existNumbers){
            throw CustomErrors.SintaxError('Los valores de la lista deben ser Id\'s de números');
        }

        //* Change delete attribute in each product by id
        await removeProducts(productsRemove, objectUser);

        //? Send the response
        res.json({ removed: true});
    } catch ({status, message}) {
        res.status(status ?? 500).json({
            error: message
        })
    };
};