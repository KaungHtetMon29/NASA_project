const express = require("express");
const planetrouter = require("./planets");
const launchesrouter = require("./launches/view");
const view = express.Router();
view.use("/planets", planetrouter);
view.use("/launches", launchesrouter);
module.exports = view;
