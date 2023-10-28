const getUserByPk = require("./getUserByPk")

module.exports = async function({userId, password}){
    const user = await getUserByPk(userId);
    
    user.password = password;

    const savedUser = await user.save();
    console.log(savedUser);
};