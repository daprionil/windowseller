module.exports = async function({ name, description, price, image },objectUser){
    const dataToCreate = { name, description, price, image };
    const createdProduct = await objectUser.createProduct(dataToCreate);
    
    const { UserId, ...rest } = createdProduct.dataValues;
    return rest;
};