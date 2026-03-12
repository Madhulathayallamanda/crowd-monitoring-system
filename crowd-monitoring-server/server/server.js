require("dotenv").config();
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const { Server } = require("socket.io");

const app = express();                // ✅ create app FIRST
const server = http.createServer(app);

// 🔥 Attach Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Make io available in routes
app.set("io", io);

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const eventRoutes = require("./routes/eventRoutes");
const locationRoutes = require("./routes/locationRoutes");
const aiRoutes = require("./routes/aiRoutes");

app.use("/api/events", eventRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/ai", aiRoutes);    // ✅ AFTER app is created
app.use("/api/auth", authRoutes);

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

// Socket Connection
io.on("connection", (socket) => {
  console.log("🟢 SOCKET CONNECTED:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 SOCKET DISCONNECTED:", socket.id);
  });
});

// Health route
app.get("/", (req, res) => {
  res.send("Crowd Monitoring Backend Running");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

