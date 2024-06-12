const router = require("express").Router();
const usersController = require("../controllers/users.cjs");

router.get("/", usersController.users_list);
router.post("/", usersController.user_create);
router.post("/login", usersController.user_login);

module.exports = router;
