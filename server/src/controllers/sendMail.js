const smtpTransport = require('../config/smtpTransport.js');

module.exports = async function(optionsMailFormat){
    await smtpTransport.sendMail(optionsMailFormat);
};