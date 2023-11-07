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
        //* Validate if the token is avaliable
        const tokenJWT = authorization.replace(/bearer/i, '').trim();
        const decodedTokenDataUser = validateJWT(tokenJWT);
        if(decodedTokenDataUser){
            
        }
        //* Search the user in the authorization
        
        //* Save the user in the locals

        next();
    } catch ({status, message}) {
        console.log(status, message);
        res.status(status).json(
            {
                error: message
            }
        )
    }
}