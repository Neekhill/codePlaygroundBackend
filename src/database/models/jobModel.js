const mongoose = require("mongoose");
const jobSchema = require("../schemas/jobSchema");

const Jobs = mongoose.model("Jobs", jobSchema);

module.exports = Jobs;
