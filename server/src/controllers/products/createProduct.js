const uploadImageController = require("../uploadImageController");

module.exports = async function({ name, description, price, image },objectUser){
    const uploadedImageUrl = await uploadImageController(image);
    console.log(uploadedImageUrl);
    return;

    const dataToCreate = { name, description, price, image: uploadedImageUrl };
    const createdProduct = await objectUser.createProduct(dataToCreate);
    
    const { UserId, ...rest } = createdProduct.dataValues;
    return rest;
};