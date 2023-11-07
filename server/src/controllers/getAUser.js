const { User } = require('../database.js');
const clearEmptyProperties = require('../utils/clearEmptyProperties.js');

const getAUser = async function({
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
        where: allDataEmptyValidation
    });

    return user;
};

module.exports = getAUser;
