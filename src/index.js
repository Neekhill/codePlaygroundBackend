const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "hello world",
  });
});

app.listen(3030, () => {
  console.log("listening at port 3030");
});
