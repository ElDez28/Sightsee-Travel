const express = require("express");
const orderController = require("../controller/orderController");
const authController = require("../controller/authController");
const router = express.Router();

router
  .route("/")
  .post(authController.protect, orderController.createOrder)
  .get(orderController.getOrders);
router.route("/:id").patch(authController.protect, orderController.updateOrder);
module.exports = router;
