const express = require("express");
const router = express.Router();
const { generateFile } = require("../services/generateFileCppService");

router.post("/", async (req, res) => {
  const { language = "cpp", code } = req.body;

  if (code === undefined) {
    res.status(400).json({
      success: false,
      message: "no code to compile",
    });
  }

  const filepath = await generateFile(language, code);

  res.json({
    filepath,
  });
});

module.exports = router;
