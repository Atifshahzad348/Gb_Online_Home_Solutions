const express = require('express');
const router = express.Router();
const authcontrollers = require("../controllers/auth-controller");
const authMiddleware = require("../Middleware/auth-middleware");



//router.route("/").get(authcontrollers.home);
router.route("/register").post(authcontrollers.register);
router.route("/login").post(authcontrollers.login);
router.route("/user").get(authMiddleware, authcontrollers.user);

// professional router from here you need to verfify chatgpt
router.route("/professionalregister").post(authcontrollers.professionalRegister);
router.route("/professionallogin").post(authcontrollers.professionallogin);
router.route("/professionals").get(authMiddleware, authcontrollers.professionals);

module.exports = router;