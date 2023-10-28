const changePasswordUser = require("../../../controllers/changePasswordUser");
const getAUser = require("../../../controllers/getAUser");
const CustomErrors = require("../../../utils/errors/CustomErrors");
const validateTokenUuidFormat = require("../../../utils/validateTokenUuidFormat");
const { validations } = require("../../../utils/validationFormFields");

module.exports = async function(req,res){
    try {
        const { tokenId } = req.params;
        const { password } = req.body;
        
        //? Validate format if the token is uuid
        const tokenUuidValidation = validateTokenUuidFormat(tokenId);
        if(!tokenUuidValidation){
            throw CustomErrors.SintaxError('No es un token válido');
        };
        
        //? Validate password format
        const passwordValidation = validations.password(password);
        if(!password.trim() || !passwordValidation){
            throw CustomErrors.SintaxError('La contraseña no es válida, Ej: passWORD23?#');
        };

        //? Validate if exist one user with that token
        const existUser = await getAUser({ token: tokenId });
        if(!existUser){
            throw CustomErrors.EmptyError('Token no válido o Caducado');
        };

        //? Validate if the password to change is different from the current one
        const passwordCurrentValidation = existUser.comparePassword(password);
        if(passwordCurrentValidation){
            throw CustomErrors.SintaxError('La nueva contraseña no es válida, escribe una diferente')
        };

        //? The user will be edited with the new password and the token will be deleted
        await changePasswordUser({ userId: existUser.id, password });
        
        //? Response with json info
        res.json({changed: true});
    } catch ({status, message}) {
        res.status(status).json({error: message});
    };
};