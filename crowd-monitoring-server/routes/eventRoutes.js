const express = require("express");
const router = express.Router();
const { createEvent } = require("../controllers/eventController");

router.post("/", createEvent);

module.exports = router;
