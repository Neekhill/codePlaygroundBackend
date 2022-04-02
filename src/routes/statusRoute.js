const express = require("express");
const { searchJob } = require("../services/jobService");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.get("/", async (req, res) => {
  const jobId = req.query.id;
  if (jobId === undefined) {
    return res
      .status(400)
      .json({ success: false, error: "missing id query param" });
  }
  try {
    const job = await searchJob(jobId);
    //console.log(`status route job: ${job}`);
    if (job === null || job === undefined) {
      return res.status(400).json({ success: false, error: "invalid job id" });
    }
    res.status(200).json({ success: true, job });

    if (job.status === "error" || job.status === "success") {
      if (job.language === "cpp" && job.status === "success") {
        let outputfile = path.join(__dirname + "../../outputs");
        console.log(outputfile);

        const jobId = path.basename(job.filepath).split(".")[0];
        outputfile = path.join(outputfile, `${jobId}.out`);

        fs.unlinkSync(job.filepath); // deleting the file after executing and sending response to the client
        fs.unlinkSync(outputfile);
      } else {
        fs.unlinkSync(job.filepath);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, error: JSON.stringify(err) });
  }
});

module.exports = router;
