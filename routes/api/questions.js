//Importing Dependecies
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//Load Extended Model
const Extended = require("../../models/Extended");
//Load Multiple Model
const Multiple = require("../../models/Multiple");
//Load User Model
const User = require("../../models/User");

//Load Validators for input
const validateMultipleInput = require("../../validation/multiple");
const validateExtendedInput = require("../../validation/extended");

//@route    POST api/questions/multiple/add
//@desc     Create a multiple choice question
//@access   Private
router.post(
  "/multiple/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateMultipleInput(req.body);
    //Check inputs are valid
    if (!isValid) {
      return res.status(400).json(errors);
    }

    //Creating new Question Object
    const newQuestion = {
      question: req.body.question,
      answers: [
        {
          option1: req.body.option1,
          option2: req.body.option2,
          option3: req.body.option3,
          option4: req.body.option4
        }
      ],
      answer: req.body.answer
    };
    //Find if User has already submitted questions:
    Multiple.findOne({ user: req.user.id })
      .then(profile => {
        //If a Quiz matching User ID is found:
        if (profile) {
          profile.quiz.unshift(newQuestion);
          profile.save().then(newQ => res.json(newQ));
          //Otherwise None found and add new quiz for user
        } else {
          const newMultiple = new Multiple({
            user: req.user.id
          });

          newMultiple.quiz = newQuestion;

          newMultiple.save().then(newQ => res.json(newQ));
        }
      })
      .catch(err => console.log(err));
  }
);

//@route    POST api/questions/extended/add
//@desc     Create an extended question
//@access   Private
router.post(
  "/extended/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExtendedInput(req.body);
    //Check inputs are valid
    if (!isValid) {
      return res.status(400).json(errors);
    }

    //Creating new question object
    const newQuestion = {
      question: req.body.question,
      keywords: req.body.keywords
    };
    Extended.findOne({ user: req.user.id }).then(profile => {
      //Find if User has already submitted questions:
      if (profile) {
        profile.quiz.unshift(newQuestion);
        profile.save().then(newQ => res.json(newQ));
      } else {
        const newExtended = new Extended({
          user: req.user.id,
          quiz: newQuestion
        });
        newExtended.save().then(newQ => res.json(newQ));
      }
    });
  }
);

//@route    GET api/questions/multiple
//@desc     Get all Multiple Choice questions
//@access   Public
router.get("/multiple/all", (req, res) => {
  questions = [];
  Multiple.find().then(multQ => {
    questions = [];
    questions.unshift(multQ);
    res.json(questions);
  });
});

//@route GET /api/questions/multiple/one
//@desc     Get One Multiple Choice question
//@access   Public
router.get("/multiple/one", (req, res) => {
  questions = [];
  Multiple.aggregate([{ $sample: { size: 1 } }]).then(multQ => {
    res.json(multQ[0].quiz[Math.floor(Math.random() * multQ[0].quiz.length)]);
  });
});

//@route    GET api/questions/extended
//@desc     Get all Extended questions
//@access   Public
router.get("/extended/all", (req, res) => {
  Extended.find().then(extQ => {
    res.json(extQ[0].quiz[Math.floor(Math.random() * extQ[0].quiz.length)]);
  });
});

//@route GET /api/questions/extended/one
//@desc     Get One extended Choice question
//@access   Public
router.get("/extended/one", (req, res) => {
  questions = [];
  Extended.aggregate([{ $sample: { size: 1 } }]).then(extQ => {
    res.json(extQ[0].quiz);
  });
});

//@route    DELETE api/questions/multiple/:id
//@desc     Delete specific multiple choice question
//@access   Private
router.post(
  "/multiple/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Multiple.findOne({ user: req.user.id })
      .then(multipleQ => {
        //Get remove index
        const removeIndex = multipleQ.quiz
          .map(item => item.id)
          .indexOf(req.param.id);

        //Splice out of array
        multipleQ.quiz.splice(removeIndex, 1);

        //Save
        multipleQ.save().then(multipleQ => res.json(multipleQ));
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route    DELETE api/questions/extemded/:id
//@desc     Delete specific multiple choice question
//@access   Private
router.post(
  "/extended/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Extended.findOne({ user: req.user.id })
      .then(extendedQ => {
        //Get remove index
        const removeIndex = extendedQ.quiz
          .map(item => item.id)
          .indexOf(req.param.id);

        //Splice out of array
        extendedQ.quiz.splice(removeIndex, 1);

        //Save
        extendedQ.save().then(extendedQ => res.json(extendedQ));
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
