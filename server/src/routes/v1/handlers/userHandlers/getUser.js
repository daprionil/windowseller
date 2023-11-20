module.exports = async function(req,res){
    try {
        const {
            namecompany, eslogan, description,
            phone, email, createdAt, updatedAt, enable
        } = res.locals.userAuthorizate;

        //* Response with de user data
        res.json({
            namecompany, eslogan, description,
            phone, email, createdAt,
            updatedAt, enable
        });
    } catch ({status, message}) {
        res.status(status ?? 500).json({error: message});
    };
};
