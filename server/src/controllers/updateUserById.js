const clearEmptyProperties = require("../utils/clearEmptyProperties.js");
const { User } = require('../database.js');

module.exports = async function(tokenId, { namecompany, eslogan, description, phone }) {
    //? Clear empty fields values
    const allDataEmptyValidation = clearEmptyProperties({ namecompany, eslogan, description, phone });
    
    //? Find the user to update
    const user = await User.findOne({
        where:{
            id: tokenId
        }
    });

    //! Set data into user
    user.set(allDataEmptyValidation);
    
    //! Return user updated
    return await user.save();
};