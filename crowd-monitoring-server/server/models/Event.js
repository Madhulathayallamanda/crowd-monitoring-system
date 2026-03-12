const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  locationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: true
  },

  type: {
    type: String,
    enum: ["ENTRY", "EXIT"],
    required: true
  },

  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Indexes for performance
eventSchema.index({ locationId: 1 });
eventSchema.index({ timestamp: -1 });

module.exports = mongoose.model("Event", eventSchema);
