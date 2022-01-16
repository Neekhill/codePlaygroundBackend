const express = require("express");
const router = express.Router();
const { generateFile } = require("../services/generateFileService");
const { executeFileCpp } = require("../services/executeFileCppService");
const { executeFilePython } = require("../services/executeFilePythonService");
const { executeFileJs } = require("../services/executeFileJsService");
const { createJob, updateJob } = require("../services/jobService");

router.post("/", async (req, res) => {
  const { language = "cpp", code } = req.body;

  if (code === undefined) {
    res.status(400).json({
      success: false,
      message: "no code to compile",
    });
  }

  let job;
  let jobId;
  let startedAt;
  let completedAt;
  let status;
  let output1;
  try {
    let output;
    // generating file
    const filepath = await generateFile(language, code);

    // creating job for every code we recieve so that we can execute it later
    job = await createJob({ language, filepath });
    console.log(job);
    jobId = job["_id"];
    res.status(201).json({ success: true, jobId });

    startedAt = Date.now();
    if (language === "cpp") {
      output = await executeFileCpp(filepath);
    }
    if (language === "py") {
      output = await executeFilePython(filepath);
    }
    if (language === "js") {
      output = await executeFileJs(filepath);
    }
    const completedAt = Date.now();
    const status = "success";
    const output1 = output;

    job = await updateJob({ jobId, startedAt, completedAt, status, output1 });
    /* res.json({filepath,output, }); */
    console.log(job);
  } catch (err) {
    completedAt = Date.now();
    status = "error";
    output1 = JSON.stringify(err);
    job = await updateJob({ jobId, startedAt, completedAt, status, output1 });
    /*  res.status(500).json({ err }); */
    console.log(job);
  }
});

module.exports = router;
