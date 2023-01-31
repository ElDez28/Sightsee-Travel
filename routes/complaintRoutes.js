const express = require("express");
const complaintController = require("../controller/complaintController");
const authController = require("../controller/authController");
const router = express.Router();

router
  .route("/")
  .get(complaintController.getComplaints)
  .post(
    authController.protect,
    authController.restrictTo("user"),
    complaintController.createComplaint
  );
router
  .route("/:id")
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    complaintController.deleteComplaint
  );
module.exports = router;
