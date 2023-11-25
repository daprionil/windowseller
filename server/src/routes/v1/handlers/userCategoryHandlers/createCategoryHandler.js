const createCategoryController = require("../../../../controllers/category/createCategoryController");
const CustomErrors = require("../../../../utils/errors/CustomErrors");

module.exports = async function(req,res){
    try {
        const { category } = req.body;
        const userObject = res.locals.userAuthorizate;

        //? If doesn't exist the category name
        const categoryName = category.trim();
        if(!categoryName){
            throw CustomErrors.SintaxError('Debes tener un nombre de categoría');
        };

        //? Create the category
        const createdCategory = await createCategoryController(categoryName, userObject);

        res.json({
            createdCategory
        });
    } catch ({status, message}) {
        res.status(status ?? 500).json({
            error: message
        });
    };
};