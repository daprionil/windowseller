const generateTokenId = require("../utils/generateTokenId");
const getUserByPk = require("./getUserByPk.js")

module.exports = async function(userId){
    //!Find user
    const user = await getUserByPk(userId, {
        attributes:{
            exclude:[
                'password'
            ]
        }
    });

    //? Set new token
    user.token = generateTokenId();
    //? Save user
    const userSaved = await user.save();

    return userSaved.token;
};