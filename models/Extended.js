//Importing Dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExtendedSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  quiz: [
    {
      question: {
        type: String,
        required: true
      },
      keywords: {
        type: [String],
        required: true
      }
    }
  ]
});

module.exports = Extended = mongoose.model("extendeds", ExtendedSchema);
