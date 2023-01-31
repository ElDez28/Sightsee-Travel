const mongoose = require("mongoose");
const complaintSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.ObjectId, ref: "User" },
    text: {
      type: String,
      required: [true, "Your complaint must have a text"],
    },
  },
  {
    timestamps: true,
  }
);

const Complaint = mongoose.model("Complaint", complaintSchema);

module.exports = Complaint;
