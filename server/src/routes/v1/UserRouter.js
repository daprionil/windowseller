const { Router } = require('express');
const LogInUser = require('./handlers/LogInUser');
const RegisterUser = require('./handlers/RegisterUser');

const UserRouter = Router();

//! Define routes
/**
 * *1. Registro - POST
 * *2. Inicio de Sesión - GET
 * *3. Activación de cuenta - POST
 * *4. Solicitud de Recuperación de contraseña - GET
 * *5. Cambio de Contraseña - PUT
 */
UserRouter.post('/', RegisterUser);
UserRouter.get('/login', LogInUser);

//? Export router
module.exports = UserRouter;