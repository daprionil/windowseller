const { Category } = require('../../database.js');

module.exports = async function(categoryId, categoryName, UserId){
    //? Founded if exist the category
    const categoryFounded = await Category.findOne({
        where:{
            UserId,
            id: categoryId
        }
    });
    
    //!If doesn't exist the category for that user
    if(!categoryFounded){
        return null;
    };

    //? Update values
    categoryFounded.category = categoryName;

    //? Save the updated Values of the category
    const updatedCategory = await categoryFounded.save();

    return updatedCategory;
};