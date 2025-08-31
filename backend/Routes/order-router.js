const express = require('express');
const router = express.Router();
const orderForm = require("../controllers/order-controller");

router.route("/clientorder", ).post(orderForm);

module.exports = router;