const mongoose = require("mongoose");
const Tour = require("./Tour");
const reviewSchema = new mongoose.Schema(
  {
    trip: [{ type: mongoose.Schema.ObjectId, ref: "Tour" }],

    user: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    rating: {
      type: Number,
    },
    text: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);
reviewSchema.statics.calcAverageRatings = async function (tripId) {
  const stats = await this.aggregate([
    {
      $match: { trip: tripId },
    },
    {
      $group: {
        _id: "$trip",
        nRatings: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tripId, {
      ratingsQuantity: stats[0].nRatings,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Tour.findByIdAndUpdate(tripId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

reviewSchema.pre(/^findOneAnd/, async function (next) {
  const rew = await this.findOne().clone();
  this.rew = rew;
  next();
});
reviewSchema.post(/^findOneAnd/, async function () {
  await this.rew.constructor.calcAverageRatings(this.rew.trip);
});

reviewSchema.post("save", function (next) {
  this.constructor.calcAverageRatings(this.trip);
});

reviewSchema.index({ tour: 1, user: 1 }, { unique: true });
const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
