const createError = require("http-errors")

  const requireLogin = (req, res, next) => {
    if(req.session && req.session.userId){
      next()
    }
    else{
      // res.status(400).json("not login")
      res.status(404).redirect('/signin')
    }

}

module.exports = { requireLogin}