const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
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
    passwordResetToken: String,
    passwordResetExpires: Date,
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

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

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 60 * 1000;

  return resetToken;
};
const User = mongoose.model("User", userSchema);

module.exports = User;
