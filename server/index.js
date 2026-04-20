const express = require("express");
const cors = require("cors");

const transactionRoutes = require("./routes/transactionRoutes");

const app = express(); // 
const { startGenerator, stopGenerator } = require("./services/transactionGenerator");
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/transactions", transactionRoutes);
app.get("/start-generator", (req, res) => {
  startGenerator();
  res.send("Generator started");
});

app.get("/stop-generator", (req, res) => {
  stopGenerator();
  res.send("Generator stopped");
});

// Test route
app.get("/", (req, res) => {
  res.send("API Running...");
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});