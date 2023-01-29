const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    trip: { type: mongoose.Schema.ObjectId, ref: "Tour" },
    user: { type: mongoose.Schema.ObjectId, ref: "User" },
    startingDate: {
      type: Date,
      required: [true, "You have to pick starting date of your journey"],
    },

    endingDate: {
      type: Date,
      required: [true, "You have to pick ending date of your journey"],
    },

    price: {
      type: Number,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "considering", "aproved", "rejected", "canceled"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    ratingsAverage: {
      type: Number,
      default: 5,
      min: [1, "Rating must be above 1.0"],
      max: [5.1, "Rating must be below 5.1"],
      set: (val) => Math.round(val * 10) / 10,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);
orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "trip",
  });
  next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
