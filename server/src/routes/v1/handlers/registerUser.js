const getAUser = require("../../../controllers/getAUser.js");
const createUser = require("../../../controllers/createUser.js");
const CustomErrors = require("../../../utils/errors/CustomErrors.js");
const { valuesErrorsFormFields } = require("../../../utils/validationFormFields.js");
const { validations } = require('../../../utils/validationFormFields.js');
const sendMail = require("../../../controllers/sendMail.js");
const confirmAccountMail = require("../../../utils/formatMails/confirmAccountMail.js");

module.exports = async function(req,res){
    try {
        //* Get Values
        const { namecompany, eslogan, description = '', phone:phoneprev, email, password } = req.body;
        const phone = phoneprev + '';

        //* Is exist all properties
        const emptyValuesValidation = Object.entries({
            namecompany, eslogan,
            phone, email,
            password,
        }).some(([,v]) => !v);
        if(emptyValuesValidation){
            throw CustomErrors.EmptyError('Completa todos los requisitos para el registro');
        };

        //* validate email format
        const validateEmail = validations.email(email);
        if(!validateEmail){
            throw CustomErrors.SintaxError(valuesErrorsFormFields.email);
        };
        //* validate password format
        const validatePassword = validations.password(password);
        if(!validatePassword){
            throw CustomErrors.SintaxError(valuesErrorsFormFields.password);
        };

        //* confirm if exist other user with that email
        const isExistUserWithEmail = await getAUser({ email });
        if(isExistUserWithEmail){
            throw CustomErrors.EmptyError('Ya existe un usuario con este email');
        };

        //* confirm if exist other user with that phone
        const isExistUserWithPhone = await getAUser({ phone });
        if(isExistUserWithPhone){
            throw CustomErrors.EmptyError('Ya existe un usuario con este teléfono')
        };
        
        //* Generate TOKEN in User values
        const userCreated = await createUser({ namecompany, description, eslogan, phone, email, password });
        
        //! Send email
        await sendMail(confirmAccountMail({
            email: userCreated.email,
            token: userCreated.token,
            namecompany: userCreated.namecompany
        }))

        //? Send response with user created
        res.json({created: true});
    } catch ({status, message}) {
        res.status(status ?? 500).json({
            error: message
        });
    };
};