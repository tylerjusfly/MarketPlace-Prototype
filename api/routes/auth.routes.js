const express = require('express');
const { Signup, Signin } = require('../controllers/auth.controller');
const router = express.Router();

router.get('/signup', (req, res)=>{
  res.render('auth/signup')
})

router.post('/signup', Signup);

router.get('/signin', (req, res) => {
  res.render('auth/signin')
});

router.post('/signin', Signin);





module.exports = router