module.exports = async function(req, res){
    try {
        res.send('Done')
    } catch ({status, message}) {
        res.status(status ?? 500).json({
            error: message
        })
    };
};