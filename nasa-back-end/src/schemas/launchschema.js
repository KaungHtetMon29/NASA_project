const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  flightNumber: {
    type: Number,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  launchdate: {
    type: Date,
    required: true,
  },
  customer: {
    type: [String],
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  upcoming: {
    type: Boolean,
    required: true,
  },
  success: { type: Boolean, required: true },
});
module.exports = mongoose.model("Launches", schema);
