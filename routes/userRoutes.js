const express = require("express");
const userController = require("../controller/userController");
const authController = require("../controller/authController");
const router = express.Router();

router
  .route("/signup")
  .post(userController.uploadUserPhoto, authController.signup);
router.route("/login").post(authController.login);
router.route("/logout").post(authController.logout);
router
  .route("/updateMe")
  .patch(
    authController.protect,
    userController.uploadUserPhoto,
    userController.updateMe
  );
router.route("/:id/getMe").get(userController.getMe);
router
  .route("/:tourId/add")
  .patch(authController.protect, userController.addToUserWishlist);
router
  .route("/:tourId/remove")
  .patch(authController.protect, userController.removeFromUserWishlist);

// router.use(authController.protect, authController.restrict);
router
  .route("/")
  .get(userController.getUsers)
  .post(userController.uploadUserPhoto, userController.createUser);

module.exports = router;
