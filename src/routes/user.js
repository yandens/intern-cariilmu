const router = require("express").Router();
const authentication = require("../middlewares/authentication");
const userController = require("../controllers/user");

router.post("/create", authentication, userController.createUser);
router.get("/all", authentication, userController.readUser.readAll);
router.get("/detail/:id", authentication, userController.readUser.read);
router.put("/update/:id", authentication, userController.updateUser);
router.delete("/delete/:id", authentication, userController.deleteUser);

module.exports = router;
