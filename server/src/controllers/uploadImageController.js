const { v2:cloudinary } = require('cloudinary');

//? Receive aobject image file
module.exports = async function(imageFile){
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: false,
    };
    
    const response = await cloudinary.uploader.upload(imageFile.path, options);
    return response;
};