const getAUser = require("../../../controllers/getAUser");
const sendMail = require("../../../controllers/sendMail");
const setTokenUser = require("../../../controllers/setTokenUser");
const CustomErrors = require("../../../utils/errors/CustomErrors");
const changePasswordUserMailFormat = require("../../../utils/formatMails/changePasswordUserMailFormat");
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
        const user = await getAUser({email});
        if(!user){
            throw CustomErrors.ErrorAuthentication('No existe un usuario con este correo electrónico');
        };
        //? Validate if the user have your account confirmed
        const confirmUserExistValidation = user.confirm;
        if(!confirmUserExistValidation){
            throw CustomErrors.UnAuthorization('Debes de confirmar tu cuenta.');
        };

        //? Token settled down in user to change password
        const tokenSettled = await setTokenUser(user.id);
        
        //! ##### SEND EMAIL to Recover password #####
        const {email: emailUser, namecompany, token} = user;
        await sendMail(changePasswordUserMailFormat({
            email: emailUser,
            namecompany,
            tokenId: token
        }))

        res.send({sending: true});
    } catch ({status, message}) {
        res.status(status ?? 500).json({error:message});
    }
}