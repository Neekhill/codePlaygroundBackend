const express = require("express");
const router = express.Router();
const { generateFile } = require("../services/generateFileService");
const { executeFileCpp } = require("../services/executeFileCppService");
const { executeFilePython } = require("../services/executeFilePythonService");
const { executeFileJs } = require("../services/executeFileJsService");

router.post("/", async (req, res) => {
  const { language = "cpp", code } = req.body;

  if (code === undefined) {
    res.status(400).json({
      success: false,
      message: "no code to compile",
    });
  }

  try {
    let output;
    const filepath = await generateFile(language, code);
    if (language === "cpp") {
      output = await executeFileCpp(filepath);
    }
    if (language === "py") {
      output = await executeFilePython(filepath);
    }
    if (language === "js") {
      output = await executeFileJs(filepath);
    }

    res.json({
      filepath,
      output,
    });
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = router;
