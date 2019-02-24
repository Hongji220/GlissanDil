const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExtendedInput(data) {
  let errors = {};

  //Changing it to an empty string if empty
  data.question = !isEmpty(data.question) ? data.question : "";

  if (Validator.isEmpty(data.question)) {
    errors.question = "Question field is required.";
  }
  //Checks array is empty
  if (isEmpty(data.keywords)) {
    errors.keywords = "The keywords fields is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
