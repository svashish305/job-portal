const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Job = new Schema({
  company: {
    type: String,
  },
  desc: {
    type: String,
  },
  applicants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  updated: Date,
});

module.exports = mongoose.model("Job", Job);
