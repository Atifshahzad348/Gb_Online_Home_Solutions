const express = require('express');
const router = express.Router();
const callForm = require("../controllers/client_call_request-controller");

router.route("/clientcall").post(callForm);




module.exports = router;