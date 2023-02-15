const router = require("express").Router();
const authentication = require("../middlewares/authentication");
const userCourseController = require("../controllers/user-course");

router.post("/create", authentication, userCourseController.createUserCourse);
router.get(
  "/user/:id",
  authentication,
  userCourseController.readUserCourse.readUserWithCourse
);
router.get(
  "/course/:id",
  authentication,
  userCourseController.readUserCourse.readCourseWithUser
);
router.put(
  "/update/:id",
  authentication,
  userCourseController.updateUserCourse
);
router.delete(
  "/delete/:id",
  authentication,
  userCourseController.deleteUserCourse
);

module.exports = router;
