module.exports = async function(req,res){
    try {
        /**
         * *1. Obtener datos de request
         * *2. Validar formato de datos
         * *3. Validar el usuario
         * *4. Validar contraseña
         * *5. Generar token JWT
         * *6. Retornar respuesta
         */
        const { password, email } = req.body;

        res.json({user:{name:'eso'}});
    } catch ({message}) {
        res.json({error: message})
    }
}