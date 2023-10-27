const { User } = require('../database.js');
const CustomErrors = require('../utils/errors/CustomErrors');

module.exports = async function({token}){
    //? Searching user to confirm account
    const userExist = await User.findOne({
        where: {
            token
        }
    });
    if(!userExist){
        throw CustomErrors.EmptyError('El token ha caducado o no existe');
    }
    
    //? Change values to user register
    userExist.confirm = true;
    userExist.token = null;

    const savedUser = await userExist.save();

    return savedUser?.dataValues;
};