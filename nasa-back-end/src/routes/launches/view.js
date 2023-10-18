const express = require("express");
const { getlaunches, setlaunches, abortlaunch } = require("./controller");
const launchesrouter = express.Router();
launchesrouter.get("/", getlaunches);
launchesrouter.post("/", setlaunches);
launchesrouter.delete("/:id", abortlaunch);

module.exports = launchesrouter;
