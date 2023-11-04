module.exports = async function(req,res, next){
    try {
        console.log('Autenticado');
        next();
    } catch ({status, message}) {
        res.status(status).json(
            {
                error: message
            }
        )
    }
}