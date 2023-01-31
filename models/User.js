const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: [true, "Entered username is alredy taken"],
    },

    email: {
      type: String,
      required: [true, "You must provide an email"],
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      min: [8, "Password must have at least 8 characters"],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords are not the same",
      },
      select: false,
    },
    image: {
      type: String,
      required: [true, "You have to provide an image"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    phone: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    myTrips: [{ type: mongoose.Schema.ObjectId, ref: "Tour" }],
    myOrders: [{ type: mongoose.Schema.ObjectId, ref: "Order" }],
    myWishlist: [{ type: mongoose.Schema.ObjectId, ref: "Tour" }],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.virtual("myReviews", {
  ref: "Review",
  foreignField: "user",
  localField: "_id",
});
const User = mongoose.model("User", userSchema);

module.exports = User;
