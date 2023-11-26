const updateCategoryController = require("../../../../controllers/category/updateCategoryController");
const CustomErrors = require("../../../../utils/errors/CustomErrors");

module.exports = async function(req,res) {
    try {
        const { categoryId } = req.params;
        const objectUser = res.locals.userAuthorizate;
        const { category } = req.body;

        //! If the categoryId is not a number
        if(isNaN(categoryId)){
            throw CustomErrors.SintaxError('No es un Id de Categoría válido');
        };

        //! If does't exist the necesary values
        const categoryName = category.trim();
        if(!categoryName){
            throw CustomErrors.SintaxError('No hay un nombre de categoría para actualizar');
        }

        //! update the category
        const updatedCategory = await updateCategoryController(
            categoryId,
            categoryName,
            objectUser.id
        );

        //! If doesn't exist the category to updated
        if(!updatedCategory){
            throw CustomErrors.NotFound('La categoría no ha sido encontrada para actualizar');
        };

        //? Send the response with the udpated Category for that user
        res.json({updatedCategory});
    } catch ({status, message}) {
        res.status(status ?? 500).json({
            error: message
        })
    }
}