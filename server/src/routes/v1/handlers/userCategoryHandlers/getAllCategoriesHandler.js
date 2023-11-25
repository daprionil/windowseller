const getAllCategoriesController = require("../../../../controllers/category/getAllCategoriesController");

module.exports = async function(req,res){
    try {
        //* Get object User from database
        const objectUser = res.locals.userAuthorizate;

        //? Search all categories of user
        const userCategories = await getAllCategoriesController(objectUser);

        //? Send response with the all categories
        res.json({userCategories});
    } catch ({status, message}) {
        res.status(status ?? 500).json({
            error: message
        });
    };
};