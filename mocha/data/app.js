let mongoose = require("mongoose");
const Job = require("./model");
const data = require("./data.json");
let fData = [];

async function connect() {
  //sima connect, ez okés
  return await mongoose.connect("mongodb://localhost:27017/testDB");
}

async function disconnect() {
  await mongoose.disconnect();
}

async function putData() {
  //végigmegyek a json-ön és egyesével hozzáadom az adatbázishoz, + kiírja hogy hozzáadta a documentet
  data.forEach(async testData => {
    const putData = new Job(testData);
    await putData.save().then(() => {
      console.log("Document added");
    });
  });
}

async function getData() {
  //simán kiszedem az adatbázisból a documenteket amik illeszkednek nyilván
  const jobs = await Job.find();
  console.log("getjob: " + jobs);
  return jobs;
}

async function deleteData() {
  //törlöm az adatbázisból a dokumenteket egyesével, az eredeti json alapján
  data.forEach(data => {
    Job.deleteOne({ city: data.city }, function (err) {
      if (err) console.log(err);
      console.log("Successful deletion");
    });
  });
}
// A probléma itt kezdődik szerintem
async function main() {
  //végig awaitezek ugye, csatlakozom a mongodb-hez
  await connect();
  //behelyezném az adatokat, egyébként gyönyörűen megjelennek a compassban látom
  await putData();
  // elmenteném a mongodb-ből beolvasottakat
  fData = await getData();
  //az összes console log előbb lefut mint bármelyik függvény hívás?! whyyy (a getData-n belüli is)
  console.log("fdata: " + fData);
  //ezzel csak törölnék ami működik is, de egyenlőre enélkül is szenvedős, de ha nem törlöm kézzel akkor ugye feltorlódik ha többször futtatom
  //await deleteData();
  //a disconnect sem működik SEHOL, akárhol próbálom instant hibát dobott
  //await disconnect();
  return fData;
}
main().catch(err => console.log(err));
