module.exports = async function(productId, objectUser){
    const product = await objectUser.getProducts({
        where: {
            id: productId,
            UserId: objectUser.id
        }
    });
    
    return product[0]?.dataValues;
};