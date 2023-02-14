require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes");
const response = require("./utils/response");
const { PORT } = process.env;

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", routes);

app.use((req, res, next) => {
  return response(res, 404, false, "Are you lost?", null);
});

// 500 handler
app.use((err, req, res, next) => {
  console.log(err);
  return response(res, 500, false, err.message, null);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
