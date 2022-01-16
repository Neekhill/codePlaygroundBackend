const Jobs = require("../database/models/jobModel");

function createJob({ language, filepath }) {
  const job = new Jobs({
    language,
    filepath,
  });
  return job.save();
}

function updateJob({ jobId, startedAt, completedAt, status, output1 }) {
  const updatedJob = Jobs.findOneAndUpdate(
    { _id: jobId },
    {
      startedAt,
      completedAt,
      status,
      output: output1,
    },
    { new: true }
  );
  return updatedJob;
}

module.exports = {
  createJob,
  updateJob,
};
