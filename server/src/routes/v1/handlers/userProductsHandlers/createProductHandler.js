module.exports = async function(req, res){
    try {
        const { name, description, price, image } = req.body;
        const objectUser = res.locals.userAuthorizate;

        //* Validate necesary values to create a product
        console.log({ name, description, price, image });
        
        res.send('Done');
    } catch ({status, message}) {
        res.status(status ?? 500).json({
            error: message
        })
    };
};