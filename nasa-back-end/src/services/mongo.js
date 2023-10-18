const mongoose = require("mongoose");
const mgurl =
  "mongodb+srv://nasaproject:nasaproject123@nasaprojectcluster.7no9w1m.mongodb.net/NasaProjectCluster?retryWrites=true&w=majority";

mongoose.connection.once("open", () => {
  console.log("connected");
});
mongoose.connection.on("error", (err) => {
  console.error(err);
});
async function mongo() {
  return await mongoose.connect(mgurl);
}
async function mongodisconnect() {
  return await mongoose.disconnect();
}
module.exports = { mongo, mongodisconnect };
