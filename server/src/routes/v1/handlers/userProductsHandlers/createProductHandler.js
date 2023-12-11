const createProduct = require("../../../../controllers/products/createProduct");
const CustomErrors = require("../../../../utils/errors/CustomErrors");
const { validations } = require("../../../../utils/validationFormFields");

module.exports = async function(req, res){
    try {
        const { name, description, price, image } = req.body;
        console.log(req.body, req.files);
        const objectUser = res.locals.userAuthorizate;

        //* Validate if exist the necesary values to create a product
        const emptyValues = Object.entries(
            {name, description, price, image}
        ).some(([,v]) => !(v+"").trim());
        if(emptyValues){
            throw CustomErrors.SintaxError('Faltan campos por recibir para la creación de producto');
        };

        //* Validate image URL format
        const validationImageUrl = validations.url(image);
        if(!validationImageUrl){
            throw CustomErrors.SintaxError('La imágen no tiene un formato válido');
        };

        //* Validate price value
        const validationPrice = /^([0-9]\d+){1,10}$/g.test(price);
        if(!validationPrice){
            throw CustomErrors.SintaxError('El precio no contiene un formato válido');
        }

        //? Create the product
        const createdProduct = await createProduct({ name, description, price, image }, objectUser);

        res.json({ createdProduct });
    } catch ({status, message}) {
        res.status(status ?? 500).json({
            error: message
        })
    };
};