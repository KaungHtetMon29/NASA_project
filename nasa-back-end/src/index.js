const express = require("express");

const cluster = require("cluster");
const os = require("os");
const planetrouter = require("./routes/planets/index");
const view = require("./routes/mainview");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const { readcsv } = require("./models/planetmodel");
const { mongo } = require("./services/mongo");
require("dotenv").config();
const app = express();

const origins = ["http://localhost:8000"];
app.use(
  cors({
    // origin: function (origin, callback) {
    //   if (origins.indexOf(origin) !== -1) {
    //     callback(null, true);
    //   } else {
    //     callback(new Error("not allowed by cors"));
    //   }
    // },
  })
);
app.use(morgan("combined"));
const PORT = process.env.PORT || 8000;
const mgurl =
  "mongodb+srv://nasaproject:nasaproject123@nasaprojectcluster.7no9w1m.mongodb.net/NasaProjectCluster?retryWrites=true&w=majority";
app.use(express.json());
app.use(view);

app.use(express.static(path.join(__dirname, "..", "front-end")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "front-end", "index.html"));
});
async function startserver() {
  await readcsv();
  await mongo();
  app.listen(PORT, console.log(`${PORT}`));
  // if (cluster.isMaster) {
  //   console.log("master is running");
  //   let cpus = os.cpus().length;
  //   console.log(cpus);
  //   for (let i = 0; i < cpus; i++) {
  //     cluster.fork();
  //   }
  // } else {
  //   console.log("work");

  // }
}
startserver();
module.exports = { app };
