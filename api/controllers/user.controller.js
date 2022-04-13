const User = require('../models/User');
const createError = require('http-errors');
const uploader = require('../config/cloudinaryConfig');
const { datauri } = require('../config/multer');

exports.myProfile = async(req, res, next) => {
  try {
    const Id = req.session.userId
  
    const user = await User.findById(Id);
    if(!user){ throw createError(404, 'User does not exist')}
    res.render('main/dashboard', {
      title : 'Dashboard',
      user : user
    })
    
  } catch (error) {
    next(error)
  }
}

exports.editAvatar = async(req, res , next) => {
  try {
    if(req.file){
      const file = datauri(req).content;
      return uploader.upload(file)
      .then((result) => {const image = result.url;
        return res.status(200).json({
          messge: 'Your image has been uploded successfully to cloudinary',
          data: {image}
        })
        


        ///vmmmmmmm
      })
    }
    
  } catch (error) {
    next(error)
  }
}