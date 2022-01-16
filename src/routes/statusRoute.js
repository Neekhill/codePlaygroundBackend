const express = require("express");
const { searchJob } = require("../services/jobService");
const router = express.Router();

router.get("/", async (req, res) => {
  const jobId = req.query.id;
  if (jobId === undefined) {
    return res
      .status(400)
      .json({ success: false, error: "missing id query param" });
  }
  try {
    const job = await searchJob(jobId);
    if (job === null || job === undefined) {
      return res.status(400).json({ success: false, error: "invalid job id" });
    }
    res.status(200).json(job);
  } catch (err) {
    return res.status(400).json({ success: false, error: JSON.stringify(err) });
  }
});

module.exports = router;
