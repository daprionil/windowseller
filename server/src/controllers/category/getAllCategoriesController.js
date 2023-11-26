module.exports = async function(objectUser){
    const categories = await objectUser.getCategories();
    const filteredCategories = categories.map(({dataValues}) => dataValues);
    
    return filteredCategories;
};