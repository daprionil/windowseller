const jsonwebtoken = require("jsonwebtoken")

const JWT_SECRET_WORD = process.env.JWT_SECRET_WORD;

//! Signa jwt with some info
module.exports = async function({data}){
    const jwtSign = jsonwebtoken.sign(
        data,
        JWT_SECRET_WORD,
        {
            expiresIn: '1d'
        }
    );
    return jwtSign;
};