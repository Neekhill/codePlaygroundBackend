const express = require("express");
const router = express.Router();
const { generateFile } = require("../services/generateFileService");
const { executeFileCpp } = require("../services/executeFileCppService");
const { executeFilePython } = require("../services/executeFilePythonService");

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

    res.json({
      filepath,
      output,
    });
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = router;
