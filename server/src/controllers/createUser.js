const { User } = require('../database.js');
const generateTokenId = require('../utils/generateTokenId.js');

module.exports = async function({
    namecompany, eslogan,
    phone, email, password
}){
    //? Create user
    const user = User.build({
        namecompany, eslogan,
        phone, email, password
    });
    
    //* Set token
    user.token = generateTokenId();
    const userSaved = await user.save();

    return userSaved;
};