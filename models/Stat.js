//Importing Dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StatSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  scores: [
    {
      qtype: {
        type: String,
        required: true
      },
      total: {
        type: Number,
        required: true
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Stat = mongoose.model("stats", StatSchema);
