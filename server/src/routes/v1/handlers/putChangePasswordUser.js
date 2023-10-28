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
        
        //? Validate password
        const passwordValidation = validations.password(password);
        if(!password.trim() || !passwordValidation){
            throw CustomErrors.SintaxError('La contraseña no es válida');
        };

        //? Validate if exist one user with that token
        const existUser = await getAUser({ token: tokenId });
        if(!existUser){
            throw CustomErrors.EmptyError('Token no válido o Caducado');
        };

        //? The user will be edit with the new password and clear token
        const userSaved = await changePasswordUser({ userId: existUser.id, password });

        res.send('Editada');
    } catch ({status, message}) {
        res.status(status).json({error: message});
    };
};