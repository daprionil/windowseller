const { User } = require('../database.js');

module.exports = async function(userId){
    return await User.findOne({
        where: {
            id: userId
        },
        attributes:{
            exclude:[
                'password'
            ]
        }
    });
}