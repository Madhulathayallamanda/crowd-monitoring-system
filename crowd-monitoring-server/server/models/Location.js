const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    capacity: {
      type: Number,
      required: true
    },

    currentOccupancy: {
      type: Number,
      default: 0
    },

    thresholdPercentage: {
      type: Number,
      default: 80
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Location", locationSchema);
