const mongoose = require("mongoose");
const planetschema = new mongoose.Schema({
  planet: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Planets", planetschema);
