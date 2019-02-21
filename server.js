// Importing dependencies
const express = require("express");
const mongoose = require("mongoose");

// Instantiating the Express app
const app = express();

//DB configurations
const db = require("./config/keys").mongoURI;

//Connecting to database
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log(`MongoDB connected`))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
