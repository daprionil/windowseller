module.exports = async function(objectUser){
    const products = await objectUser.getProducts({
        attributes:{
            exclude: [
                'UserId'
            ]
        }
    });
    
    //* If not exist products of the user
    if(products.length === 0){
        return [];
    };

    //* Filter products to get only datavalues property
    const filterProducts = products.map(({dataValues}) => dataValues);
    
    //? Return the products filtered
    return filterProducts;
};