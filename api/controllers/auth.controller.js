const User = require('../models/User');
const bcrypt = require('bcrypt');
const createError = require('http-errors')


exports.Signup = async(req, res, next) => {
  let { firstname, lastname, username, email, password, repeat_password} = req.body
  
  try {
     // Checking if passwords match
     if( password !== repeat_password){
      throw createError(400, "Password don't match")
    }

    let user = await User.findOne({email});
    if(user){throw createError(422, "User already exists")}
    await User.findOne({username});

    // hash password
    const salt = await bcrypt.genSalt(10);
   password = await bcrypt.hash(password, salt);
   let dateJoined = new Date().toLocaleString('default', { month: 'long', year : 'numeric' })

  let createUser = new User({
    firstname,
    lastname,
    username,
    email,
    password,
    joined : dateJoined
  })
  await createUser.save();
  // res.status(201).send(createUser);
  res.status(201).redirect('/signin')

  } catch (err){
    next(err)
  }

}

exports.Signin = async(req, res, next) => {
  let {email, password} = req.body;

  try {
    let user = await User.findOne({email});
    if(!user) { throw createError(404, "Invalid User Credentials")}

    const matchPass = bcrypt.compare(password, user.password)
    if(!matchPass){throw createError(400, "Invalid password Credentials")}

    // else create session
    req.session.userId = user._id
    return res.redirect('/dashboard')
    // return res.json(user)
    
    
  } catch (err) {
    next(err)
  }

}