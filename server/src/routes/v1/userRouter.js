const { Router } = require('express');
const LogInUser = require('./handlers/logInUser');
const registerUser = require('./handlers/registerUser');
const confirmUser = require('./handlers/confirmUser');

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
UserRouter.post('/:tokenId', confirmUser);
    //? Log In user
UserRouter.get('/login', LogInUser);

//? Export router
module.exports = UserRouter;