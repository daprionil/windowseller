const getUserByPk = require("../controllers/getUserByPk");
const CustomErrors = require("../utils/errors/CustomErrors");
const validateJWT = require("../utils/validateJWT");

module.exports = async function(req,res, next){
    try {
        const { authorization } = req.headers;

        //* Validate if exist an Authorization Token
        if(!authorization){
            throw CustomErrors.EmptyError('No existe un valor de autorización');
        }
        //* Validate if the token is valid format
        const rgxValidationJWT = /bearer/i.test(authorization);
        if(!rgxValidationJWT){
            throw CustomErrors.SintaxError('No es un formato de tóken válido');
        }

        //* Validate if exist a token
        const tokenJWT = authorization.replace(/bearer/i, '').trim();
        if(!tokenJWT){
            throw CustomErrors.EmptyError('No existe un valor de autorización correspondiente');
        };

        //* Validate if the token is avaliable
        const decodedTokenDataUser = validateJWT(tokenJWT);
        if(!decodedTokenDataUser.id){
            throw CustomErrors.ErrorAuthentication('No está autorizado para continuar');
        };
        //* Search the user in the authorization
        const userFind = await getUserByPk(decodedTokenDataUser.id);
        if(!userFind){
            throw CustomErrors.ErrorAuthentication('No se ha logrado encontrar un Usuario relacionado');
        }
        //* If the user is enabled
        const isEnableUser = userFind.enable;
        if(!isEnableUser){
            throw CustomErrors.UnAuthorization('Tu usuario no está habilitado');
        };

        //* Save the user object in the locals
        res.locals.userAuthorizate = userFind;
        next();
    } catch ({status, message}) {
        res.status(status ?? 500).json(
            {
                error: message
            }
        )
    }
}