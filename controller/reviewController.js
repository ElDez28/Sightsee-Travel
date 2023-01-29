const factory = require("./handlerFactory");
const Review = require("../models/Review");
const catchAsync = require("../util/catchAsync");
exports.createReview = factory.createOne(Review);
exports.getReviews = factory.getAll(Review);
exports.getOneReview = factory.getOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.getReviewsOfUser = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();
  const userReviews = reviews.filter((review) => {
    return review.user[0].toString() === req.user._id.toString();
  });

  res.status(200).json({
    status: "success",
    data: userReviews,
  });
});
exports.getTripReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({ trip: req.params.id }).populate("user");

  res.status(200).json({
    status: "success",
    data: reviews,
  });
});
