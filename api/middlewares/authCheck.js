const createError = require("http-errors")

  const requireLogin = (req, res, next) => {
    if(req.session.userId){
      next()
    }
    else{
      // throw createError(500, "please Login")
      res.status(404).redirect('/signin')
    }

}

module.exports = { requireLogin}