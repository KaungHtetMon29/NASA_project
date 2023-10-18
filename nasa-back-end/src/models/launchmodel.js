const launchdb = require("../schemas/launchschema");
// const launches = new Map();
const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  destination: "Keple-442 b",
  customer: ["ZTM", "Nasa"],
  upcoming: true,
  success: true,
};

var launchno = 100;

// launches.set(launch.flightNumber, launch);
const getlaunches = async () => {
  return await launchdb.find({}, { _id: 0, __v: 0 });
  // return Array.from(launches.values());
};
const setlaunches = async (launch) => {
  const flightNumber = await getlatestlaunch();
  // console.log(flightNumber);
  if (flightNumber !== undefined) {
    await launchdb.updateOne(
      { flightNumber: launch.flightNumber },
      {
        flightNumber: flightNumber,
        ...launch,
        upcoming: true,
        success: true,
        customer: ["ZTM", "NASA"],
      },
      {
        upsert: true,
      }
    );
  } else {
    await launchdb.updateOne(
      { flightNumber: 100 },
      {
        flightNumber: flightNumber,
        ...launch,
        upcoming: true,
        success: true,
        customer: ["ZTM", "NASA"],
      },
      {
        upsert: true,
      }
    );
  }

  // launchno++;
  // launches.set(
  //   launchno,
  //   Object.assign(launch, {
  //     flightNumber: launchno,
  //     mission: launch.mission,
  //     rocket: launch.rocket,
  //     launchdate: new Date(launch.launchdate),
  //     customer: ["ZTM", "Nasa"],
  //     upcoming: true,
  //     success: true,
  //   })
  // );
};
const insertlaunch = async (launch) => {
  await launchdb.insert({ t: test });
};
const getlatestlaunch = async () => {
  const data = await launchdb
    .findOne({}, { flightNumber: 1, _id: 0 })
    .sort("-flightNumber");
  if (data) {
    return (data.flightNumber = data.flightNumber + 1);
  } else return launchno;
};
const abortlaunch = async (id) => {
  const aborted = Number(id);
  const update = await launchdb.updateOne(
    { flightNumber: id },
    { upcoming: false, success: false }
  );
  return update;

  // aborted.upcoming = false;
  // aborted.success = false;
  // return aborted;
};
setlaunches(launch);
const exist = (id) => {
  return launches.has(Number(id));
};
module.exports = {
  launch,
  getlaunches,
  setlaunches,
  abortlaunch,
  exist,
  insertlaunch,
};
