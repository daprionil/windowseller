require('dotenv').config();
const { db:conndb, User } = require('./src/database.js');
const app = require('./src/server.js');

const PORT = process.env.PORT_SERVER || 3000;

//! Starts app
//* Generate connection to db
conndb.sync({force: true})
    .then(() => {
        console.log('----- Connection database was successfully -----');
        
        //! Start server
        app.listen(PORT, () => {
            console.log('Servidor corriendo correctamente en el puerto ' + PORT);
            
            //? Prueba
            // User.create({
            //     namecompany: 'Window',
            //     eslogan: 'aSell your products',
            //     description:"Esa es mi papá",
            //     phone: 1920839021,
            //     email: 'lassa0@gnau.com',
            //     password: 'esoes12'
            // }).then(console.log);
        });
    });