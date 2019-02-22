//Importing Dependecies
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//Load User Model
const User = require("../../models/User");

//@route    GET api/users/register
//@desc     Register User route
//@access   Public
router.post("/register", (req, res) =>
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        usergroup: req.body.usergroup,
        password: req.body.password
      });

      //@desc Generating a salt and hashing the password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  })
);

//@route    GET api/users/login
//@desc     Login user / Returning JSON web tokens
//@access   Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //Find user by email
  User.findOne({ email }).then(user => {
    //Check if User exists
    if (!user) {
      return res.status(404).json({ email: "User not found." });
    }
    //Check if password is correct
    bcrypt.compare(password, user.password).then(isValid => {
      if (isValid) {
        //User is Valid
        const jwtpayload = {
          id: user.id,
          name: user.name,
          usergroup: user.usergroup
        }; //Create JWT payload
        //Sign token
        jwt.sign(
          jwtpayload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res.status(400).json({ password: "password incorrect" });
      }
    });
  });
});

//@route    GET api/users/current
//@desc     Return Current User - Testing purposes
//@access   Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ msg: "success" });
  }
);

module.exports = router;
