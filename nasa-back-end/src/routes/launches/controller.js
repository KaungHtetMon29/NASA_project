const {
  launches,
  getlaunches: getalllaunches,
  setlaunches: addlaunches,
  abortlaunch: cancellaunch,
  exist,
  insertlaunch,
} = require("../../models/launchmodel");
const getlaunches = async (req, res) => {
  return res.status(200).json(await getalllaunches());
};
const setlaunches = (req, res) => {
  const launch = req.body;
  console.log(launch);
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchdate ||
    !launch.destination
  ) {
    return res.status(400).json({ error: "invalid input" });
  } else {
    addlaunches(launch);
    return res.status(200).json(launch);
  }
};
const abortlaunch = async (req, res) => {
  console.log(req.params.id);
  const abort = await cancellaunch(req.params.id);
  console.log(abort);
  if (abort.matchedCount === 0) {
    return res.status(400).json("not found");
  } else {
    return res.status(200).json("success");
  }
  // if (exist(req.params.id)) {
  //   cancellaunch(req.params.id);
  //   return res.status(200).json("success");
  // } else {
  //   return res.status(404).json({ message: "not found" });
  // }
};
module.exports = { getlaunches, setlaunches, abortlaunch };
