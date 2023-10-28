const getUserByPk = require("./getUserByPk")

module.exports = async function({userId, password}){
    //? Find user
    const user = await getUserByPk(userId);
    
    //? Set values from proccess
    user.password = password;
    user.token = null;

    //? Save changes
    await user.save();
};