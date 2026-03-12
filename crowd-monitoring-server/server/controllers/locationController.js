const Location = require("../models/Location");

// Create new location
exports.createLocation = async (req, res) => {
  try {
    const { name, capacity, thresholdPercentage } = req.body;

    if (!name || !capacity) {
      return res.status(400).json({ message: "Name and capacity are required" });
    }

    const location = await Location.create({
      name,
      capacity,
      thresholdPercentage
    });

    res.status(201).json({ success: true, location });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all locations
exports.getLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
