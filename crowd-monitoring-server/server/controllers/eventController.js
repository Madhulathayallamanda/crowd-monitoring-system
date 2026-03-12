const Location = require("../models/Location");
const Event = require("../models/Event");

exports.createEvent = async (req, res) => {
  try {
    const { locationId, type } = req.body;
    const io = req.app.get("io"); // ✅ SAFE ACCESS

    if (!locationId || !type) {
      return res.status(400).json({ message: "locationId and type required" });
    }

    const location = await Location.findById(locationId);
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }

    // Update occupancy
    if (type === "ENTRY") {
      location.currentOccupancy += 1;
    } else if (type === "EXIT") {
      location.currentOccupancy = Math.max(0, location.currentOccupancy - 1);
    } else {
      return res.status(400).json({ message: "Invalid type" });
    }

    await location.save();
    await Event.create({ locationId, type });

    const occupancyPercent = Math.round(
      (location.currentOccupancy / location.capacity) * 100
    );

    // 📡 Real-time update
    io.emit("occupancyUpdate", {
      locationId,
      locationName: location.name,
      currentOccupancy: location.currentOccupancy,
      capacity: location.capacity,
      occupancyPercent
    });

    // 🚨 Alert logic
    const thresholdCount = Math.floor(
      (location.thresholdPercentage / 100) * location.capacity
    );

    if (location.currentOccupancy >= thresholdCount) {
      io.emit("alert", {
        locationId,
        message: "⚠️ Crowd threshold exceeded!",
        occupancy: location.currentOccupancy
      });
    }

    res.status(201).json({
      success: true,
      currentOccupancy: location.currentOccupancy,
      occupancyPercent
    });

  } catch (err) {
    console.error("Event error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

