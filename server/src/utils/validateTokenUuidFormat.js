const { validate } = require('uuid');

module.exports = function(token){
    return validate(token)
};