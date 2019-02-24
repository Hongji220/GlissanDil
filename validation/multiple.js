const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateMultipleInput(data) {
  let errors = {};

  //Changing it to an empty string if empty
  data.question = !isEmpty(data.question) ? data.question : "";
  data.option1 = !isEmpty(data.option1) ? data.option1 : "";
  data.option2 = !isEmpty(data.option2) ? data.option2 : "";
  data.option3 = !isEmpty(data.option3) ? data.option3 : "";
  data.option4 = !isEmpty(data.option4) ? data.option4 : "";
  data.answer = !isEmpty(data.answer) ? data.answer : "";

  if (Validator.isEmpty(data.question)) {
    errors.question = "Question field is required.";
  }
  if (Validator.isEmpty(data.option1)) {
    errors.option1 = "The first option field is required.";
  }
  if (Validator.isEmpty(data.option2)) {
    errors.option2 = "The second field is required.";
  }
  if (Validator.isEmpty(data.option3)) {
    errors.option3 = "The third option field is required.";
  }
  if (Validator.isEmpty(data.option4)) {
    errors.option4 = "The fourth option field is required.";
  }
  if (Validator.isEmpty(data.answer)) {
    errors.answer = "The answer field is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
