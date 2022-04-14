const express = require('express');
const router = express.Router();
const { Signup, Signin } = require('../controllers/auth.controller');
const { myProfile, viewUserProfile, getallUser } = require('../controllers/user.controller');
const {requireLogin} = require('../middlewares/authCheck');
const {multerUploads} = require('../config/multer')


router.post('/signup', Signup);

router.get('/signin', (req, res) => {
  res.render('auth/signin')
});

router.post('/signin', Signin);

router.get('/dashboard', requireLogin, myProfile)

// router.post('/uploads', multerUploads, editAvatar)
router.get('/users/:uid', viewUserProfile);

router.get('/users', getallUser);




module.exports = router;