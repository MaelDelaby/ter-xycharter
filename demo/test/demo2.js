const expect = require("chai").expect;
const nock = require("nock");
const axios = require("axios").default;
const YELLOW_COLOR = "\x1b[33m";
const GREEN_COLOR = "\x1b[32m";
const MAGENTA_COLOR = "\x1b[35m";
const WHITE_COLOR = "\x1b[37m";

var uniqid = require("uniqid");
const { timeStamp } = require("console");

const rooting = "http://localhost:4020";

console.log(
  "**************** Demo client send integer data timeseries *****************"
);

var idDataSet;
var dataClient;
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
let pointsN = [];

for (let i = 0; i < 200; i++) {
  pointsN.push({ x: i, y: getRandomInt(1000) });
}

dataClient = {
  name: "normalData10",
  points: pointsN,
};

axios.post(rooting + "/dataSets", dataClient).then((response) => {
  console.log(
    MAGENTA_COLOR,
    "Le client récupère la clè du dataset : ",
    YELLOW_COLOR,
    response.data
  );
  idDataSet = response.data;
});
