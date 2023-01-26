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
      enum: ["pending", "under consideration", "approved", "rejected"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
