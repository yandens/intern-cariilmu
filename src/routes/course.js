const router = require("express").Router();
const authentication = require("../middlewares/authentication");
const courseController = require("../controllers/course");

router.post("/create", authentication, courseController.createCourse);
router.get("/detail", authentication, courseController.readCourse.read);
router.get("/all", authentication, courseController.readCourse.readAll);
router.put("/update", authentication, courseController.updateCourse);
router.delete("/delete", authentication, courseController.deleteCourse);

module.exports = router;
