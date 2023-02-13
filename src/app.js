require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { PORT } = process.env;
const app = express();

app.use(morgan("dev")); // for logging
app.use(express.json()); // read body type json
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  return res.status(404).json({
    status: false,
    message: "Are you lost?",
  });
});

// 500 handler
app.use((err, req, res, next) => {
  console.log(err);
  return res.status(500).json({
    status: false,
    message: err.message,
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
