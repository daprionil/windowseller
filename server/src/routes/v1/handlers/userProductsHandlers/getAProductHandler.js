const getAProductById = require("../../../../controllers/products/getAProductById");
const CustomErrors = require("../../../../utils/errors/CustomErrors");

module.exports = async function(req, res){
    try {
        const { productId } = req.params;
        const objectUser = res.locals.userAuthorizate;

        //* Validate the value from productId
        if(isNaN(productId)){
            throw CustomErrors.SintaxError('El idenficador no tiene un formato válido');
        }

        //* get a product
        const productFound = await getAProductById( productId, objectUser );
        console.log(productFound);

        res.send('Done');
    } catch ({status, message}) {
        res.status(status ?? 500).json({
            error: message
        })
    };
};