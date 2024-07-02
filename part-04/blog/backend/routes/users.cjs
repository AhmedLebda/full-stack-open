const router = require("express").Router();
const usersController = require("../controllers/users.cjs");
const requireAccess = require("../utils/middlewares/auth/requireAccess.cjs");

router.post("/", usersController.user_create);
router.post("/login", usersController.user_login);

router.use(requireAccess);

router.get("/", usersController.users_list);

module.exports = router;
