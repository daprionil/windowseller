module.exports = async function(objectUser){
    const categories = await objectUser.getCategories();

    return categories;
};