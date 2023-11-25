const { Router } = require('express');
const logInUser = require('./handlers/logInUser');
const registerUser = require('./handlers/registerUser');
const confirmUser = require('./handlers/confirmUser');
const changeToPassword = require('./handlers/changeToPassword.js');
const validateToken = require('./handlers/validateToken');
const putChangePasswordUser = require('./handlers/putChangePasswordUser');
const authUser = require('../../middlewares/authUser.js');
const getUser = require('./handlers/userHandlers/getUser.js');
const updateDataUser = require('./handlers/userHandlers/updateDataUser');

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
//? Register an user
UserRouter.post('/', registerUser);
//? Confirm account for user registered
UserRouter.get('/confirm/:tokenId', confirmUser);
//? Log In user
UserRouter.post('/login', logInUser);

//* Password Routes
    //? Request to change password redirect
UserRouter.post('/changepassword', changeToPassword);
UserRouter.route('/changepassword/:tokenId')
            .get(validateToken)//? Request the validation for one token to change Password
            .put(putChangePasswordUser)//? Update user with new password

//*##################################

//! ####### Privdate User Routes
//? Return the basic user data
UserRouter.get('/', authUser, getUser);
UserRouter.put('/', authUser, updateDataUser);


//? Export router
module.exports = UserRouter;