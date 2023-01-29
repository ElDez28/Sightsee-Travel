const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const reviewController = require("../controller/reviewController");
router
  .route("/")
  .post(authController.protect, reviewController.createReview)
  .get(reviewController.getReviews);
router
  .route("/getUserReviews")
  .get(authController.protect, reviewController.getReviewsOfUser);
router.route("/:id/tripReviews").get(reviewController.getTripReviews);
router
  .route("/:id")
  .patch(authController.protect, reviewController.updateReview);
module.exports = router;
