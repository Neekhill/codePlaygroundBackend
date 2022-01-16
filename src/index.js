const express = require("express");
const app = express();
const Db = require("./database/db");
const cors = require("cors");

const RunRoute = require("./routes/runRoute");
const StatusRoute = require("./routes/statusRoute");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/run", RunRoute);
app.use("/status", StatusRoute);

app.get("/", (req, res) => {
  res.json({
    message: "hello world",
  });
});

app.listen(3030, async () => {
  try {
    await Db.connect();
    console.log("Connetion Successful");
  } catch (err) {
    console.log(`Error found! ${err}`);
  }

  console.log("listening at port 3030");
});
