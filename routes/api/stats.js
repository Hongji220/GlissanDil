//Importing Dependecies
const express = require("express");
const router = express.Router();
const passport = require("passport");

//Load User Model
const Stat = require("../../models/Stat");
//Load User Model
const User = require("../../models/User");

//Load Validators for input
const validateStatInput = require("../../validation/stat");

//@route    POST api/stats/add
//@desc     Add a statistic
//@access   Private
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateStatInput(req.body);
    //Check inputs are valid
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newStat = {
      qtype: req.body.qtype,
      total: req.body.total
    };

    Stat.findOne({ user: req.user.id }).then(stat => {
      //Check inputs are valid

      //If user already has stats
      if (stat) {
        stat.scores.unshift(newStat);
        stat.save().then(returnStat => res.json(returnStat));
        //Otherwise create a new Stat document
      } else {
        const newStatistic = new Stat({
          user: req.user.id
        });
        newStatistic.scores = newStat;
        newStatistic.save().then(returnStat => res.json(returnStat));
      }
    });
  }
);

//@route    GET api/stats/
//@desc     Get all the stats for the current user
//@access   Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Check inputs are valid

    //Finds the user's Stats
    Stat.findOne({ user: req.user.id })
      .then(stat => {
        if (stat) {
          res.json(stat.scores);
        } else {
          errors = {};
          errors.noStat = true;
          res.status(404).json(errors);
        }
      })
      //If the User doesn't have any stats
      .catch(err => {
        errors = {};
        errors.noStat = "This user doesn't have any statistics";
        res.status(404).json(errors);
      });
  }
);

module.exports = router;
