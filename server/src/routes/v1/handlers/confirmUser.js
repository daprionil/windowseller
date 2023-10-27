const confirmUserAccount = require("../../../controllers/confirmUserAccount.js");
const CustomErrors = require("../../../utils/errors/CustomErrors.js");
const validateTokenUuidFormat = require("../../../utils/validateTokenUuidFormat.js");

module.exports = async function(req,res){
    try {
        const { tokenId } = req.params;

        //* Validate format token
        if(!validateTokenUuidFormat(tokenId)){
            throw CustomErrors.ErrorAuthentication('El token no es válido');
        };

        //* Confirm account
        await confirmUserAccount({token: tokenId});

        //? Send success response
        res.send({confirmed: true});
    } catch ({status, message}) {
        res.status(status).json({error:message})
    }
}