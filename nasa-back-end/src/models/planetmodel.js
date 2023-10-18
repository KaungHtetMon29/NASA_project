const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");
const { resolve } = require("path");
const { rejects } = require("assert");
const planet = require("../schemas/planetschema");

// const planets = [];
function Readcsv() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    ).pipe(
      parse({ comment: "#", columns: true })
        .on("data", async (data) => {
          if (
            data["koi_disposition"] === "CONFIRMED" &&
            data["koi_insol"] > 0.36 &&
            data["koi_insol"] < 1.11 &&
            data["koi_prad"] < 1.6
          ) {
            savedata(data);
            // planets.push(data.kepler_name);
          }
        })
        .on("error", (err) => {
          reject(err);
        })
        .on("end", () => {
          resolve();
          console.log(planet);
        })
    );
  });
}
async function getplanets() {
  return await planet.find({}, { _id: 0, __v: 0 });
}
async function savedata(data) {
  try {
    await planet.updateOne(
      { planet: data.kepler_name },
      { planet: data.kepler_name },
      { upsert: true }
    );
  } catch (error) {
    console.log("error" + error);
  }
}
module.exports = {
  readcsv: Readcsv,
  getplanets: getplanets,
};
