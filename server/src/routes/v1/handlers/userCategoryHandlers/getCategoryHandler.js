const getCategoryController = require('../../../../controllers/category/getCategoryController');
const CustomErrors = require('../../../../utils/errors/CustomErrors');

module.exports = async function(req,res){
    try {
        const { categoryId } = req.params;
        //* Get the user object from database
        const userObject = res.locals.userAuthorizate;
        
        //! If does't exist the necesary values
        if(!categoryId && !userObject.id){
            throw CustomErrors.ServerError('No ha sido posible retornar la categoría');
        }

        //! get the category
        const category = await getCategoryController(categoryId, userObject.id);
        
        //! Validate if exist the category
        if(!category){
            throw CustomErrors.NotFound('No ha sido posible encontrar dicha categoría');
        };

        //? Send response
        res.json({category});
    } catch ({status, message}) {
        res.status(status ?? 500).json({
            error: message
        });
    };
};