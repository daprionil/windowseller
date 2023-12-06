const { Product } = require('../../database.js');

module.exports = async function(listProducts, objectUser){
    const { id } = objectUser;
    const clearListProducts =  [...new Set(listProducts)];
    
    //? Update the deleted value to the Products Id
    const productsUpdated = await Product.update({
        deleted: true
    },{
        where: {
            UserId: id,
            id: clearListProducts,
            deleted: false
        },
        attributes: {
            exclude: [
                'UserId'
            ]
        }
    });

    return productsUpdated[0];//? Number
};