const mongoose = require("mongoose");
require("dotenv").config();
const mgurl = process.env.URL;

mongoose.connection.once("open", () => {
  console.log("connected");
});
mongoose.connection.on("error", (err) => {
  console.error(err);
});
async function mongo() {
  console.log("ran");
  return await mongoose.connect(mgurl);
}
async function mongodisconnect() {
  return await mongoose.disconnect();
}
module.exports = { mongo, mongodisconnect };
