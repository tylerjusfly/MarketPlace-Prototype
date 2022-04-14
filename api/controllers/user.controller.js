const User = require('../models/User');
const createError = require('http-errors');
const uploader = require('../config/cloudinaryConfig');

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

// exports.editAvatar = async(req, res , next) => {
//   try {
//     if(req.file){
//       const file = datauri(req).content;
//       return uploader.upload(file)
//       .then((result) => {const image = result.url;
//         return res.status(200).json({
//           messge: 'Your image has been uploded successfully to cloudinary',
//           data: {image}
//         })
        
//       })
//     }
    
//   } catch (error) {
//     next(error)
//   }
// }

exports.viewUserProfile = async(req, res, next) => {
  const {uid} = req.params
  try {
    const user = await User.findById(uid);
    if(!user){throw createError(404, "User not found")}
    res.status(200).send(user)

  } catch (err) {
    next(err)
  }

}

exports.getallUser = async(req,res, next)=>{
  try {
    const users = await User.find();
    res.status(200).send(users)
  } catch (err) {
    next(err)
  }
}