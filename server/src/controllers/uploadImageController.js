const path = require('path');
const { v2:cloudinary } = require('cloudinary');

//? Receive aobject image file
module.exports = function(imageFile){
    const publicId = ((Date.now()).toString() + imageFile.name).toString(32);
    const options = {
        public_id: publicId,
        use_filename: true,
        unique_filename: false,
        overwrite: false
    };
    
    //! NOT SUCH FILE DIRECTORY
    const pathTmpImage = path.join(path.relative() ,imageFile.path);
    return cloudinary.uploader.upload( pathTmpImage, options);
}