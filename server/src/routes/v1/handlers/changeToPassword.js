const getAUser = require("../../../controllers/getAUser");
const setTokenUser = require("../../../controllers/setTokenUser");
const CustomErrors = require("../../../utils/errors/CustomErrors");
const { validations } = require("../../../utils/validationFormFields");

module.exports = async function(req,res){
    try {
        const { email } = req.body;
    
        //? Validate format email
        const emailFormatValidation = validations.email(email);
        if(!emailFormatValidation){
            throw CustomErrors.SintaxError('El correo electrónico no es válido');
        };
        //? Validate if exist one user with that email
        const existUser = await getAUser({email});
        if(!existUser){
            throw CustomErrors.ErrorAuthentication('No existe un usuario con este correo electrónico');
        };
        //? Validate if the user have your account confirmed
        const confirmUserExistValidation = existUser.confirm;
        if(!confirmUserExistValidation){
            throw CustomErrors.UnAuthorization('Debes de confirmar tu cuenta.');
        };

        //? Token settled down in user to change password
        const tokenSettled = await setTokenUser(existUser.id);

        //! ##### SEND EMAIL to Recover password #####

        res.send({sending: true});
    } catch ({status, message}) {
        res.status(status).json({error:message});
    }
}