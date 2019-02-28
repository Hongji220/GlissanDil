const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  //Changing it to an empty string if empty
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.usergroup = !isEmpty(data.usergroup) ? data.usergroup : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.name, { min: 3, max: 64 })) {
    errors.name = "Name must be between 3 and 64 characters.";
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required.";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid.";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required.";
  }
  if (
    !(
      data.usergroup.toLowerCase() === "student" ||
      data.usergroup.toLowerCase() === "teacher"
    )
  ) {
    errors.usergroup = "User Group must be either teacher or student";
  }
  if (Validator.isEmpty(data.usergroup)) {
    errors.usergroup = "User group field is required.";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 64 })) {
    errors.password = "Password must be between 6 - 64 characters.";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match.";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Password confirm is required.";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required.";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
