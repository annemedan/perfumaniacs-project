const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    reviewer: { type: Schema.Types.ObjectId, ref: "User" },
    perfume: { type: Schema.Types.ObjectId, ref: "Perfume" },
    text: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Review = model("Review", reviewSchema);

module.exports = Review;