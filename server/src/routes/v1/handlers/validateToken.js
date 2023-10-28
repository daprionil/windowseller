const getAUser = require('../../../controllers/getAUser.js');
const CustomErrors = require('../../../utils/errors/CustomErrors');
const validateTokenUuidFormat = require('../../../utils/validateTokenUuidFormat.js');

module.exports = async function(req,res){
    try{
        const { tokenId } = req.params;
        
        //? Validate format if the token is uuid
        const tokenUuidValidation = validateTokenUuidFormat(tokenId);
        if(!tokenUuidValidation){
            throw CustomErrors.SintaxError('No es un token válido');
        };

        //? Validate if exist one user with that token
        const existUser = await getAUser({ token: tokenId });
        if(!existUser){
            throw CustomErrors.EmptyError('Token no válido o Caducado');
        };

        //? Response if the tokenId is a valide token
        res.json({
            isValid: true
        })
    }catch({status, message}){
        res.status(status).json({
            error: message
        });
    };
};
