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
  const {email} = req.body;
  try {
    const user = await User.findOne({email});
    if(!user){throw createError(404, "User not found")}
    res.status(200).render('main/viewUser', {user : user})

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

exports.followUser = async(req, res, next) => {
  const {uid} = req.params

  try {
    const userToFollow = await User.findById(uid);
    if(userToFollow.followers.indexOf(req.session.userId) != -1){
      throw createError(400, "You already follow this user");
    }
    else{
      userToFollow.followers.push(req.session.userId);
      await userToFollow.save();
    }
    // get req.user and update its following array
    await User.findByIdAndUpdate(
      req.session.userId,
      { $push : {following : uid}},
      {new : true}
    );
      res.status(200).redirect('/user')
        


  } catch (err) {
    next(err)
    
  }
}
exports.viewFollowers = async(req, res, next) => {
  const user = await User.findById(req.session.userId)
  .populate({ path: "followers", select: " email username profilepicture" })

  try {
    if(!user){ throw createError(404, "user not found")}
    // user.forEach(ele => {
    //   console.log()
    // });
    res.render('main/followers', {
      user : user.followers
    })
    // res.json(user.followers)

  } catch (err) {
    next(err)
  }


}

exports.unFollow = async(req, res, next) => {
  const {uid} = req.params;

  try {
    let userToUnfollow = await User.findById(uid);

    let index = userToUnfollow.followers.indexOf(req.session.userId);
    if(index != -1){
      userToUnfollow.followers.splice(index, 1);
      await userToUnfollow.save();
    }
    else{
      throw createError(400, "You don't follow this user.")
    }
    await User.findByIdAndUpdate(
      req.session.userId,
      { $pull : { following : uid}},
      {new : true}
    );
    res.status(200).redirect('/user')

  } catch (err) {
    next(err)
  }
}

exports.viewFollowing = async(req, res, next) => {
  const user = await User.findById(req.session.userId)
  .populate({ path: "following", select: " email username profilepicture" })

  try {
    if(!user){ throw createError(404, "user not found")}

    res.render('main/following', {
      user : user.following
    })
    // res.json(user.followers)

  } catch (err) {
    next(err)
  }


}