const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  firstname : {
    type : String, 
    lowercase: true,
    required : true,
    maxlength: [30, "Firstname can't be longer than 30 characters"]
  },
  lastname : {
    type : String, 
    lowercase: true,
    required : [true, 'Lastname is required'], 
    maxlength: [30, "Lastname can't be longer than 30 characters"]
  },
  username : {
    type : String, 
    required : [true, "Username is required"],
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    lowercase : true,
    unique: true,
    match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
    ],
},
  password : {
    type : String, 
    required : [true, "Password is required"], 
    minlength : [8, "Password can't be shorter than 8 characters"]
  },
  bio : {type : String, default: ''},
  admin : {type : Boolean, default: false},
  profilepicture : {
    type : String, 
    default : 'https://pbs.twimg.com/profile_images/1257280933557710850/95taFO3E_400x400.jpg'
  },
  joined : {type : String, },
  history : {
    type: Array,
    default : []
  },
  // User has an array of followers and an array of following
followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
balance : { type : Number, default: 0.00 }
})

// UserSchema.statics.usernameExist = async function(username){
//   try {
//     const user = await this.findone({username})
//     if(user) {return false}
//     //else
//     return true;

//   } catch (error) {
//     return false;
//   }
// }

const User = mongoose.model('User', UserSchema)

module.exports = User;