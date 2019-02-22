// Importing dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

// @Importing Route files:
// @/routes/API/Users
const users = require("./routes/api/users");

// Instantiating the Express app
const app = express();

//BodyParser Middleware
// @desc The options to expose the request onto "req.body"
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB configurations
const db = require("./config/keys").mongoURI;

//Connecting to database
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log(`MongoDB connected`))
  .catch(err => console.log(err));

//Passport Middleware
app.use(passport.initialize());

//Passport Config
require("./config/passport")(passport);

// @ROUTES:

// @UserRoute in ./routes/api/users
app.use("/api/users", users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
