const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const jobId = req.query.id;
  if (jobId === undefined) {
    return res
      .status(400)
      .json({ success: false, error: "missing id query param" });
  }
});

module.exports = router;
