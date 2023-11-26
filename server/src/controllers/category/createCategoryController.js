module.exports = async function(categoryName, User){
    const category = await User.createCategory({
        category: categoryName
    });

    return category.dataValues;
};