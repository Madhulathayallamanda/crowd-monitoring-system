const express = require("express");
const router = express.Router();

const {
  createLocation,
  getLocations
} = require("../controllers/locationController");

// CREATE location
router.post("/", createLocation);

// GET all locations
router.get("/", getLocations);

module.exports = router;
