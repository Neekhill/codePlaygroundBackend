const express = require("express");
const app = express();
const RunRoute = require("./routes/runRoute");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/run", RunRoute);

app.get("/", (req, res) => {
  res.json({
    message: "hello world",
  });
});

app.listen(3030, () => {
  console.log("listening at port 3030");
});
