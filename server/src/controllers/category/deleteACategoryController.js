const { Category } = require('../../database.js');

module.exports = async function(categoryId, UserId){
    const categoryFounded = await Category.findOne({
        where:{
            id: categoryId,
            UserId
        }
    });
    
    //! If doesn't exist the category
    if(!categoryFounded){
        return null;
    };
    
    //! Delete the category
    await categoryFounded.destroy();
    
    return true;
};