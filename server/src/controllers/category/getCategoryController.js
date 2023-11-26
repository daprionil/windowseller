const { Category } = require('../../database.js');

module.exports = async function(categoryId, UserId){
    const category = await Category.findOne({
        where:{
            UserId,
            id: categoryId
        }
    });

    return category.dataValues;
};