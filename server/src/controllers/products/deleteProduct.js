const { Product } = require('../../database.js');
//! Only execute this when the products was be deleted

module.exports = async function(productsToDelete, objectUser){
    // //? Update the deleted value to the Products Id
    const { id } = objectUser;
    const clearListProducstToDelete = [...new Set(productsToDelete)];
    
    //? Delete the products
    const destroyedProducts = await Product.destroy({
        where: {
            UserId: id,
            id: clearListProducstToDelete,
            deleted: true
        },
        force: true,
    });
    
    return !!destroyedProducts;
};