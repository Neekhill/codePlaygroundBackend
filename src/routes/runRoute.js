const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { language, code } = req.body;

  res.json({
    language: language,
    code: code,
  });
});

module.exports = router;
