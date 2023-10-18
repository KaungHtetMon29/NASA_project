const express = require("express");
const Getplanet = require("./controllers/getplanet");
const planetrouter = express.Router();
planetrouter.get("/", Getplanet);
module.exports = planetrouter;
