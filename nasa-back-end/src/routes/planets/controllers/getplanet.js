const { getplanets: getallplanets } = require("../../../models/planetmodel");

async function Getplanet(req, res) {
  console.log(await getallplanets());
  return res.status(200).json(await getallplanets());
}
module.exports = Getplanet;
