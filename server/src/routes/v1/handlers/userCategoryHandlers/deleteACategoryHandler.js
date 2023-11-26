const deleteACategoryController = require("../../../../controllers/category/deleteACategoryController");
const CustomErrors = require("../../../../utils/errors/CustomErrors");

module.exports = async function(req,res){
    try {
        const { categoryId } = req.params;
        const objectUser = res.locals.userAuthorizate;

        //! If the categoryId is NaN
        if(isNaN(categoryId)){
            throw CustomErrors.SintaxError('El Identificador de la categoría no es válido');
        };

        //! If the category doesn't exist
        const deletedCategory = await deleteACategoryController(categoryId, objectUser.id);
        if(deletedCategory === null){
            throw CustomErrors.NotFound('No se ha encontrado una categoría para eliminar');
        };

        //? Send response to the client
        res.json({
            deleted: deletedCategory
        });
    } catch ({status, message}) {
        res.status(status ?? 500).json({
            error: message
        });
    };
};