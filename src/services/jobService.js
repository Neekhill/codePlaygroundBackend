const Jobs = require("../database/models/jobModel");

function createJob({ language, filepath }) {
  const job = new Jobs({
    language,
    filepath,
  });
  return job;
}

module.exports = {
  createJob,
};
