//Importing Dependecies
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//Load User Model
const User = require("../../models/User");

//Load Validators for input
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//@route    POST api/users/register
//@desc     Register User route
//@access   Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  //Check inputs are valid
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists!";
      return res.status(400).json(errors);
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
  });
});

//@route    POST api/users/login
//@desc     Login user / Returning JSON web tokens
//@access   Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  //Check inputs are valid
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //Find user by email
  User.findOne({ email }).then(user => {
    //Check if User exists
    if (!user) {
      errors.email = "User Not found";
      return res.status(404).json(errors);
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
        errors.password = "Password Incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

//@route    POST api/users/update
//@desc     Update the user profile
//@access   Private
router.post(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById({ _id: req.user.id }).then(user => {
      //Update
      User.findOneAndUpdate(
        { _id: req.user.id },
        { $set: { name: req.body.name } },
        { new: true }
      ).then(user => {
        user.password = undefined;
        res.json(user);
      });
    });
  }
);

//@route    DELETE api/users/delete
//@desc     Delete the current user
//@access   Private
router.delete(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOneAndRemove({ _id: req.user.id }).then(() =>
      res.json({
        sucess: true
      })
    );
  }
);

//@route    GET api/users/current
//@desc     Return Current User - Testing purposes
//@access   Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

module.exports = router;
