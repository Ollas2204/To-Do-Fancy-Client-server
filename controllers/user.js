const FB = require('fb');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



module.exports = {
  login_fb: (req, res) => {
    User.findOne({
        email: req.body.email
      })
      .then(userData => {
        if (userData === null) {
          User.create({
              name: req.body.name,
              email: req.body.email,
              fbid: req.body.id,
            })
            .then(resultInput => {
              let tokenUser = jwt.sign({
                id: resultInput._id,
                name: resultInput.name,
                email: resultInput.email
              }, process.env.SECRET_TOKEN)

              res
                .status(200)
                .json({
                  token: tokenUser
                })
            })

            .catch(err => {
              res
                .status(400)
                .json(err)
            })
        } else {
          let tokenUser = jwt.sign({
            id: userData._id,
            name: userData.name,
            email: userData.email
          }, process.env.SECRET_TOKEN)

          res
            .status(200)
            .json({
              token: tokenUser
            })
        }
      })

      .catch(err => {
        res
          .status(400)
          .json(err)
      })
  },
  login: (req, res) => {

    const userData = {
      email: req.body.email,
      password: req.body.password
    }
    //
    // console.log(userData);

    User.findOne({ email: req.body.email }, (err, response) => {
        if (!response) {
          return res.status(401).send({
            message: "Please fill the information correctly"
          })
        }

        if (!bcrypt.compareSync(req.body.password, response.password)) {
          return res.status(401).send({
            message: "Please fill the information correctly"
          })
        }

        let tokenUser = jwt.sign({
          id: response._id,
          name: response.name,
          email: response.email
        }, process.env.SECRET_TOKEN)

        console.log(tokenUser);

        res.status(200).send({
          message: "Correct Information",
          token: tokenUser
        })
    })
    // try {
    //   let data_user = await User.findOne({
    //     email: req.body.email,
    //   })
    //
    //   if (!data_user) {
    //     return res.status(401).send({
    //       message: "Please fill the information correctly"
    //     })
    //   }
    //
    //   if (!bcrypt.compareSync(req.body.password, data_user.password)) {
    //     return res.status(401).send({
    //       message: "Please fill the information correctly"
    //     })
    //   }
    //
    //   let tokenUser = jwt.sign({
    //     id: data_user._id,
    //     name: data_user.name,
    //     email: data_user.email
    //   }, process.env.SECRET_TOKEN)
    //
    //   return res.status(200).send({
    //     message: "Correct Information",
    //     token: tokenUser
    //   })
    // } catch (e) {
    //   console.log(e)
    //   next(e)
    // }
  },
  addUser: (req, res) => {
    let salt = bcrypt.genSaltSync(8);
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    let newUser = new User(req.body);
    console.log(newUser);

    newUser
      .save()
      .then(response => {
        res.status(201).json({
          msg: 'add new user',
          response
        })
      })
      .catch(err => {
        res.status(500).json({
          err
        })
      })
  },
  updateUser: (req, res) => {
    let id = req.params.id;
    let updateUser = req.body;
    User.findByIdAndUpdate(
      id, {
        $set: updateUser
      }, {
        new: true
      },
      (err, updateUser) => {
        if (err) {
          res.status(400).json({
            err
          });
          return console.log(err);;
        }
        res.status(201).json({
          msg: "update customer successful",
          updateUser
        })
      }
    )
  },
  deleteUser: (req, res) => {
    let id = req.params.id;
    let deleteUser = req.body;
    User.findByIdAndRemove(id, (err, deletedUser) => {
      if (err) {
        res.status(400).json({
          err
        });
        return console.log(err);;
      }
      res.status(201).json({
        msg: 'delete customer successful',
        deletedUser
      })
    })
  }
}
