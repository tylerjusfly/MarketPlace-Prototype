const express = require('express');
const router = express.Router();
const { Signup, Signin } = require('../controllers/auth.controller');
const { myProfile, viewUserProfile, getallUser, followUser, viewFollowers, unFollow, viewFollowing } = require('../controllers/user.controller');
const {requireLogin} = require('../middlewares/authCheck');
const {multerUploads} = require('../config/multer')


router.post('/signup', Signup);

router.get('/signin', (req, res) => {
  res.render('auth/signin')
});

router.post('/signin', Signin);

router.get('/dashboard', requireLogin, myProfile)

// router.post('/uploads', multerUploads, editAvatar)
router.post('/user', viewUserProfile);

router.get('/users', getallUser);

router.post('/users/follow/:uid', requireLogin, followUser);
router.post('/users/unfollow/:uid', requireLogin, unFollow);

router.get('/followers',requireLogin, viewFollowers);
router.get('/following',requireLogin, viewFollowing);





module.exports = router;