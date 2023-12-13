const uploadImageController = require("../uploadImageController");

module.exports = async function({ name, description, price, image }, objectUser){
    //* Upload image to get the URL
    const uploadedImage = await uploadImageController(image);

    //* Centralize data to create the Product
    const dataToCreate = { name, description, price, image: uploadedImage.secure_url };
    
    //* Create product in DB
    const createdProduct = await objectUser.createProduct(dataToCreate);
    
    //* Extract important values of the product created
    const { UserId, ...productCreated } = createdProduct.dataValues;

    return productCreated;
};