const getAUser = require("../../../controllers/getAUser.js");
const CustomErrors = require("../../../utils/errors/CustomErrors");
const generateJWT = require("../../../utils/generateJWT.js");

module.exports = async function(req,res){
    try {
        const { password, email } = req.body;
        
        //! Validate empty values
        if(!password || !email){
            throw CustomErrors.EmptyError('No se encuentran todos los requisitos para la solicitud');
        };

        //! Validate if exist a user with that credentials
        const userFind = await getAUser({email});
        if(!userFind){
            throw CustomErrors.EmptyError('No existe un usuario con dicho correo');
        }
        //! Validate passwords
        const passwordValidation = userFind.comparePassword(password);
        if(!passwordValidation){
            throw CustomErrors.ErrorAuthentication('La contraseña no es correcta');
        };

        //! Validate if accout is confirmed
        const confirmedUserFind = userFind.confirm;
        if(!confirmedUserFind){
            throw CustomErrors.UnAuthorization('Tu cuenta no está confirmada, revisa tu email');
        }
        
        //! Generate JWT with info user
        const jwt = await generateJWT({
            data:{
                id: userFind.id
            }
        });

        //? Response with the jwt in json
        res.json({sesion: jwt});
    } catch ({message}) {
        res.json({error: message})
    }
}