const { Router } = require('express');
const logInUser = require('./handlers/logInUser');
const registerUser = require('./handlers/registerUser');
const confirmUser = require('./handlers/confirmUser');
const changeToPassword = require('./handlers/changeToPassword.js');
const validateToken = require('./handlers/validateToken');
const putChangePasswordUser = require('./handlers/putChangePasswordUser');
const authUser = require('../../middlewares/authUser.js');

const UserRouter = Router();

//! Define routes
/**
 * *1. Registro - POST
 * *2. Inicio de Sesión - GET
 * *3. Activación de cuenta - POST
 * *4. Solicitud de Recuperación de contraseña - GET
 * *5. Cambio de Contraseña - PUT
 */

//* Sesion Requests

//* Password Routes
    //? Request to change password redirect
UserRouter.post('/changepassword', changeToPassword);
UserRouter.route('/changepassword/:tokenId')
            .get(validateToken)//? Request the validation for one token to change Password
            .put(putChangePasswordUser)//? Update user with new password

//*##################################

    //? Register an user
UserRouter.post('/', registerUser);
    //? Confirm account for user registered
UserRouter.get('/confirm/:tokenId', confirmUser);
    //? Log In user
UserRouter.post('/login', logInUser);

//? Export router
module.exports = UserRouter;