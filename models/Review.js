const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
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
const User = mongoose.model("User", userSchema);
