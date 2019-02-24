const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateStatInput(data) {
  let errors = {};

  //Changing it to an empty string if empty
  data.qtype = !isEmpty(data.qtype) ? data.qtype : "";
  data.total = !isEmpty(data.total) ? data.total : "";
  console.log(data.qtype);
  //Qtype is either multiple or extended
  if (!(data.qtype === "multiple" || data.qtype === "extended")) {
    errors.qtype = "Question type is invalid.";
  }
  //Only when empty is this true
  if (Validator.isEmpty(data.qtype)) {
    errors.qtype = "The question type is required.";
  }
  //Only the integer ISN'T between 0 and 100 is this true
  if (!Validator.isInt(data.total, { min: 0, max: 100 })) {
    errors.total = "Total must be between 0 and 100";
  }
  //Only when empty is this true
  if (Validator.isEmpty(data.total)) {
    errors.total = "Total field is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
