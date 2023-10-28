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
        throw CustomErrors.EmptyError('El token ha caducado');
    }
    
    //? Change values to user register
    userExist.confirm = true;
    userExist.token = null;

    //? Save changes of user
    await userExist.save();
};