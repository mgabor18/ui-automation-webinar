let mongoose = require("mongoose");
const Job = require("./model");

class DataProvider {
  constructor() {}

  async connect() {
    await mongoose.connect("mongodb://localhost:27017/testDB");
  }

  async disconnect() {
    await mongoose.disconnect();
  }

  async dropCollection() {
    await this.connect();
    await Job.collection.drop();
    await this.disconnect();
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

  async setupData(data) {
    await this.putData(data);
    return this.getData();
  }

  async deleteData(data) {
    await this.connect();
    for (let delData of data) {
      await Job.deleteOne({ city: delData.city }, err => {
        if (err) console.log(err);
      }).clone();
    }

    setTimeout(async () => {
      await this.disconnect();
    }, 100);
  }
}

module.exports = DataProvider;
