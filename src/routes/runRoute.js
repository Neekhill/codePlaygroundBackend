const express = require("express");
const router = express.Router();
const { generateFile } = require("../services/generateFileService");
const { executeFileCpp } = require("../services/executeFileCppService");
const { executeFilePython } = require("../services/executeFilePythonService");
const { executeFileJs } = require("../services/executeFileJsService");
const { createJob } = require("../services/jobService");

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
    // generating file
    const filepath = await generateFile(language, code);

    // creating job for every code we recieve so that we can execute it later
    const job = createJob({ language, filepath });
    console.log(job);
    const jobId = job["_id"];
    res.status(201).json({ success: true, jobId });

    if (language === "cpp") {
      output = await executeFileCpp(filepath);
    }
    if (language === "py") {
      output = await executeFilePython(filepath);
    }
    if (language === "js") {
      output = await executeFileJs(filepath);
    }
    /* res.json({filepath,output, }); */
    console.log({ filepath, output });
  } catch (err) {
    /*  res.status(500).json({ err }); */
    console.log({ err });
  }
});

module.exports = router;
