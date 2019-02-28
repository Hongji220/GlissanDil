//Importing Dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MultipleSchema = new Schema({
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
      answers: [
        {
          option1: {
            type: String,
            required: true
          },
          option2: {
            type: String,
            required: true
          },
          option3: {
            type: String,
            required: true
          },
          option4: {
            type: String,
            required: true
          }
        }
      ],
      answer: {
        type: Number,
        required: true
      }
    }
  ]
});

module.exports = Multiple = mongoose.model("multiples", MultipleSchema);
