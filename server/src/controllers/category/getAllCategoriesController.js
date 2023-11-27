const { Product } = require('../../database.js');

module.exports = async function(objectUser){
    const categories = await objectUser.getCategories({
        order: [
            [ 'createdAt', 'DESC' ]
        ]
    });
    
    const filteredCategories = categories.map(({dataValues}) => dataValues);
    
    return filteredCategories;
};