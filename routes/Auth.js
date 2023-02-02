const AuthController = require("../controllers/Auth");
const Route_Protector = require("../middlewares/route_protector")

const router = require("express").Router();

router.get("/account", Route_Protector, AuthController.getAccount)

router.get("/login", AuthController.getLogin)
router.post("/login", AuthController.postLogin)

router.get("/signup", AuthController.getSignUp)
router.post("/signup", AuthController.postSignUp)

router.post("/logout", Route_Protector, AuthController.postLogout)

module.exports = router