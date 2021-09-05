let mongoose = require("mongoose");
const Job = require("./model");

class DataProvider {
  constructor() {
    this.fData = [];
  }

  async connect() {
    await mongoose.connect("mongodb://localhost:27017/testDB");
  }

  async disconnect() {
    await mongoose.disconnect();
  }

  async putData(data) {
    await this.connect();
    for (let testData of data) {
      const job = new Job(testData);
      await job.save();
    }
    await this.disconnect();
  }

  async getData() {
    await this.connect();
    const jobs = await Job.find();
    await this.disconnect();
    return jobs;
  }

  async deleteData(data) {
    await this.connect();
    for (let delData of data) {
      await Job.deleteOne({ city: delData.city }, err => {
        if (err) console.log(err);
      }).clone(); // clone nélkül nem hajlandó futtatni a parancsot, mert hogy már ez a query futtatva volt? nem is értettem
    }
    //kókány megoldás de máshogy egyszerűen nem várta be a törléseket...
    setTimeout(async () => {
      await this.disconnect();
    }, 100);
  }
}
module.exports = DataProvider;

/*let mongoose = require("mongoose");
const Job = require("./model");
const data = require("./data.json");
let fData = [];

async function connect() {
  await mongoose.connect("mongodb://localhost:27017/testDB");
}

async function disconnect() {
  await mongoose.disconnect();
}

async function putData() {
  await connect();
  for (let testData of data) {
    const job = new Job(testData);
    await job.save();
  }
  await disconnect();
}

async function getData() {
  await connect();
  const jobs = await Job.find();
  await disconnect();
  return jobs;
}

async function deleteData() {
  await connect();
  for (let delData of data) {
    await Job.deleteOne({ city: delData.city }, err => {
      if (err) console.log(err);
      console.log("deleted");
    }).clone();
  }
  setTimeout(async () => {
    await disconnect();
  }, 10);
}

async function main() {
  await putData();
  fData = await getData();
  console.log(fData);
  await deleteData();
  return fData;
}
main().catch(err => console.log(err));
*/
