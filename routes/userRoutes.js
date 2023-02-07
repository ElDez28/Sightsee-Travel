const express = require("express");
const userController = require("../controller/userController");
const authController = require("../controller/authController");
const router = express.Router();

router
  .route("/signup")
  .post(userController.uploadUserPhoto, authController.signup);
router.route("/login").post(authController.login);
router.route("/logout").post(authController.logout);
router.route("/forgotPassword").post(authController.forgotPassword);
router.route("/resetPassword/:token").patch(authController.resetPassword);
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

router
  .route("/")
  .get(userController.getUsers)
  .post(userController.uploadUserPhoto, userController.createUser);
router.use(authController.protect, authController.restrictTo("admin"));
router.route("/:id").patch(userController.updateUser);

module.exports = router;
