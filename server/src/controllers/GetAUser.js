const { User } = require('../database.js');
const ClearEmptyProperties = require('../utils/ClearEmptyProperties');

const GetAUser = async function({
    id,
    namecompany,
    eslogan,
    description,
    phone,
    email,
    token,
    password
}){
    //? Clear empty properties
    const allDataEmptyValidation = ClearEmptyProperties({
        id, namecompany, eslogan,
        description, phone, email,
        token, password
    });
    
    //? Find user with properties
    const user = await User.findOne({
        where: allDataEmptyValidation
    });

    return user;
};

module.exports = GetAUser;
