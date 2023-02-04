const mongoose = require("mongoose");
const locationsSchema = new mongoose.Schema({
  type: {
    type: String,
    default: "Point",
    enum: ["Point"],
  },
  coordinates: [Number],
  name: String,
});

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A tour must have a name"],
      unique: true,
      trim: true,
    },
    desc: {
      type: String,
      default:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis ullam quo optio animi fugiat incidunt voluptatum! Minus voluptates quas, architecto iste provident quae veritatis quaerat dicta totam in, obcaecati neque!",
    },
    descOne: {
      type: String,
      default: "CULTURE",
    },

    descTwo: {
      type: String,
      default: "RELAXING",
    },
    icon: {
      type: Number,
      enum: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    },

    theme: {
      type: Number,
      enum: [0, 1, 2, 3, 4, 5],
    },

    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "A tour must have a price"],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    tripDuration: {
      type: String,
    },
    imageCover: {
      type: String,
      // required: [true, "A tour must have a cover image"],
    },
    images: [String],

    finalLocation: {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: [Number],
    },
    locations: [locationsSchema],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

tourSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "trip",
  localField: "_id",
});
const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
