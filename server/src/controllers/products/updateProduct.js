const { Product } = require('../../database.js');
const CustomErrors = require('../../utils/errors/CustomErrors.js');

module.exports = async function(productId, dataToUpdateProduct, objectUser){
    console.log(dataToUpdateProduct);
    const { id } = objectUser;
    const foundProduct = await Product.findOne({
        where: {
            UserId: id,
            id: productId
        },
        attributes: {
            exclude: [ 'UserId', 'enabled' ]
        }
    });
    
    //! If the product dont exist by that id
    if(!foundProduct){
        throw CustomErrors.NotFound('El producto a actualizar no ha sido encontrado');
    };

    //* Then
    await foundProduct.update(dataToUpdateProduct);
    const updatedProduct = await foundProduct.save();
    
    return updatedProduct.dataValues;
};