const updateProduct = require("../../../../controllers/products/updateProduct");
const clearEmptyProperties = require("../../../../utils/clearEmptyProperties");
const CustomErrors = require("../../../../utils/errors/CustomErrors");

module.exports = async function(req, res){
    try {
        const { productId } = req.params;
        const objectUser = res.locals.userAuthorizate;
        const { avaliable, image, name, description, price } = req.body;
        
        const objectValuesToUpdate = { avaliable, image, name, description, price };

        //* Validate Id of the productId
        if(isNaN(productId) || !productId.toString() ){
            throw CustomErrors.SintaxError('No es un Id producto válido');
        };

        //* Clear params in the obj to update the values
        const clearParamsToUpdateProduct = clearEmptyProperties(objectValuesToUpdate);
        if(!Object.keys(clearParamsToUpdateProduct).length){
            throw CustomErrors.SintaxError('No hay valores para actualizar');
        };
        //* Validate if exist that product Id
        const updatedProduct = await updateProduct(productId, clearParamsToUpdateProduct, objectUser);

        //? Send response to the client
        res.json({updatedProduct});
    } catch ({status, message}) {
        res.status(status ?? 500).json({
            error: message
        })
    };
};