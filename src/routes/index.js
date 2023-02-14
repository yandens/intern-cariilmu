const router = require("express").Router();
const authRouter = require("./auth");
const response = require("../utils/response");

router.get("/", (req, res) => {
  return response(res, 200, true, "Test Success", null);
});

router.use("/auth", authRouter);

module.exports = router;
