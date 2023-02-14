const router = require("express").Router();
const authentication = require("../middlewares/authentication");
const userController = require("../controllers/user");

router.post("/create", authentication, userController.createUser);
router.get("/all", authentication, userController.readUser.readAll);
router.get("/detail/:email", authentication, userController.readUser.read);
router.put("/update/:email", authentication, userController.updateUser);
router.delete("/delete/:email", authentication, userController.deleteUser);

module.exports = router;
