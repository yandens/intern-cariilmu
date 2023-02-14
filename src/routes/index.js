const router = require("express").Router();
const authRouter = require("./auth");
const userRouter = require("./user");
const courseCategoryRouter = require("./course-category");
const response = require("../utils/response");

router.get("/", (req, res) => {
  return response(res, 200, true, "Test Success", null);
});

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/course-category", courseCategoryRouter);

module.exports = router;
