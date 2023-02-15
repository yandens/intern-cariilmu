const router = require("express").Router();
const authRouter = require("./auth");
const userRouter = require("./user");
const courseCategoryRouter = require("./course-category");
const courseController = require("./course");
const userCourseController = require("./user-course");
const response = require("../utils/response");

router.get("/", (req, res) => {
  return response(res, 200, true, "Test Success", null);
});

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/course-category", courseCategoryRouter);
router.use("/course", courseController);
router.use("/user-course", userCourseController);

module.exports = router;
