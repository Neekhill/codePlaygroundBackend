const express = require("express");
const router = express.Router();
const { generateFileCpp } = require("../services/generateFileCppService");
const { executeFileCpp } = require("../services/executeFileCppService");
router.post("/", async (req, res) => {
  const { language = "cpp", code } = req.body;

  if (code === undefined) {
    res.status(400).json({
      success: false,
      message: "no code to compile",
    });
  }

  const filepath = await generateFileCpp(language, code);
  const output = await executeFileCpp(filepath);
  res.json({
    filepath,
    output,
  });
});

module.exports = router;
