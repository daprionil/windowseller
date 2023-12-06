module.exports = function(obj){
    return Object.fromEntries(
        Object.entries(obj).filter(([,v]) => (
            !!(v)?.toString()
        ))
    );
};