const jsonwebtoken = require('jsonwebtoken');

module.exports = function(tokenJWT){
    const { JWT_SECRET_WORD } = process.env;
    return jsonwebtoken.verify(tokenJWT, JWT_SECRET_WORD);
}
