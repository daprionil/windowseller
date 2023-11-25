const updateUserById = require("../../../../controllers/updateUserById");
const clearEmptyProperties = require("../../../../utils/clearEmptyProperties");
const CustomErrors = require("../../../../utils/errors/CustomErrors");

module.exports = async function(req,res){
    try {
        const user = res.locals.userAuthorizate;
        const { namecompany, eslogan, description, phone } = req.body;

        //? Validate if exist values to update
        const fillValuesOfBody = clearEmptyProperties({ namecompany, eslogan, description, phone });
        if(!Object.entries(fillValuesOfBody).length){
            throw CustomErrors.EmptyError('No hay valores para actualizar');
        };
        
        //? Updating values of user
        const userUpdated = await updateUserById(user.id, fillValuesOfBody);

        //? Send response to client
        res.json({
            userUpdated
        });
    } catch ({message, status}) {
        res.status(status ?? 500).json({
            error: message
        });
    };
};