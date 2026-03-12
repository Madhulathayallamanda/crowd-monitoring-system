const express = require("express");
const router = express.Router();

router.post("/crowd-data", (req, res) => {
  const { location, count } = req.body;

  console.log(`AI Update from ${location}: ${count}`);

  const io = req.app.get("io");

  const capacity = 100;
  const percent = Math.floor((count / capacity) * 100);

  io.emit("aiUpdate", {
    location,
    count,
    capacity,
    percent
  });

  if (percent > 80) {
    io.emit("aiAlert", {
      location,
      message: `⚠️ High crowd at ${location}`
    });
  }

  res.json({ success: true });
});

module.exports = router;
