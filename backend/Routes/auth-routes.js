
// test code

const express = require('express');
const router = express.Router();
const authcontrollers = require("../controllers/auth-controller");
const authMiddleware = require("../Middleware/auth-middleware");
const statusMiddleware = require("../Middleware/status-middleware");

router.route("/register").post(authcontrollers.register);
router.route("/login").post(authcontrollers.login);
router.route("/logout").post(authMiddleware, authcontrollers.logout); // ADD LOGOUT ROUTE
router.route("/user").get(authMiddleware, authcontrollers.user);
router.route("/status").get(authMiddleware, authcontrollers.checkStatus); // ADD STATUS CHECK ROUTE
router.route("/professionalregister").post(authcontrollers.professionalRegister);
router.route("/professionallogin").post(authcontrollers.professionallogin);
router.route("/professionals").get(authMiddleware, authcontrollers.professionals);
router.route("/profileorder").get(authMiddleware, authcontrollers.getUserProfileOrder);

module.exports = router;