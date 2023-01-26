const express = require("express");
const tourController = require("../controller/tourController");
const authController = require("../controller/authController");
const router = express.Router();

router
  .route("/")
  .get(tourController.getTours)
  .post(
    authController.protect,
    authController.restrict,
    tourController.createTour
  );
router.route("/:id").get(tourController.getOne);

module.exports = router;
