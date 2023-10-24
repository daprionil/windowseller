const { Router } = require('express');
const LogInUser = require('./handlers/LogInUser');

const UserRouter = Router();

//! Define routes
/**
 * *1. Inicio de Sesión - GET
 * *2. Registro - POST
 * *3. Activación de cuenta - POST
 * *4. Solicitud de Recuperación de contraseña - GET
 * *5. Cambio de Contraseña - PUT
 */
UserRouter.get('/login', LogInUser);

//? Export router
module.exports = UserRouter;