const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  country: { type: String, required: true },
  city: { type: String, required: true },
  department: { type: String, required: true },
  positionName: { type: String, required: true },
  nthJob: { type: String, required: true },
});

module.exports = mongoose.model("Job", schema, "testCollection");
