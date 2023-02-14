const router = require("express").Router();
const authentication = require("../middlewares/authentication");
const courseCategoryController = require("../controllers/course-category");

router.post(
  "/create",
  authentication,
  courseCategoryController.createCourseCategory
);
router.get(
  "/all",
  authentication,
  courseCategoryController.readCourseCategory.readAll
);
router.get(
  "/detail",
  authentication,
  courseCategoryController.readCourseCategory.read
);
router.put(
  "/update",
  authentication,
  courseCategoryController.updateCourseCategory
);
router.delete(
  "/delete",
  authentication,
  courseCategoryController.deleteCourseCategory
);

module.exports = router;
