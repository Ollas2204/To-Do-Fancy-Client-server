const jwt = require('jsonwebtoken');
module.exports = {
  decrypt : (req, res, next) => {
    if (!req.headers.token) {
      next({msg : "Unautorized",
     })
    }
    else {
      var decoded = jwt.verify(req.headers.token, process.env.SECRET_TOKEN,
        (err, resultInput) => {
          if (err) {
            next({
              msg : "Unautorized"
            })
          }
          else {
            req.decoded = {
              id: resultInput.id,
              name: resultInput.name,
              email: resultInput.email
            }
            next()
          }
    });
    }
  }
}
