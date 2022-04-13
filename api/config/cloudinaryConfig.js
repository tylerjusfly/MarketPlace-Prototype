const { config, uploader } = require('cloudinary');
require('dotenv').config();

const cloudinaryConfig = (req, res, next) => { config({
  Cloud_name : 'codebreakers',
  cloud_key : process.env.Cloud_Key,
  cloud_secret : process.env.Cloud_Secret
});

next()

}



module.exports = {uploader, cloudinaryConfig};