const { User } = require('../database.js');
const clearEmptyProperties = require('../utils/clearEmptyProperties.js');

const GetAUser = async function({
    id,
    namecompany,
    eslogan,
    description,
    phone,
    email,
    token,
}){
    //? Clear empty properties
    const allDataEmptyValidation = clearEmptyProperties({
        id, namecompany, eslogan,
        description, phone, email, token,
    });
    
    //? Find user with properties
    const user = await User.findOne({
        where: allDataEmptyValidation,
        attributes:{
            exclude: [
                'password'
            ]
        }
    });

    return user;
};

module.exports = GetAUser;
