require('dotenv').config();
const { db:conndb } = require('./src/database.js');
const app = require('./src/server.js');
require('./src/config/cloudinaryConfig.js');

const PORT = process.env.PORT_SERVER || 3000;

//! Starts app
//* Generate connection to db
conndb.sync({alter: true})
    .then(() => {
        console.log('----- Connection database was successfully -----');
        
        //! Start server
        app.listen(PORT, () => {
            console.log('Servidor corriendo correctamente en el puerto ' + PORT);
            
            //? Prueba
        });
    });