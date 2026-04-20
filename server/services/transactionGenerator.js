const pool = require("../db/db");
const detectFraud = require("./fraudService");

// Locations
const locations = ["India", "USA", "UK", "Germany"];

// 🔹 Interval reference
let intervalId = null;

// 🔹 Generate transaction
const generateTransaction = async () => {
  try {
    const isHighRisk = Math.random() < 0.3;

    let amount;
    let location;

    if (isHighRisk) {
      amount = Math.floor(10000 + Math.random() * 10000);
      location = "Unknown";
    } else {
      amount = Math.floor(100 + Math.random() * 5000);
      location = locations[Math.floor(Math.random() * locations.length)];
    }

    const currencyMap = {
      India: "INR",
      USA: "USD",
      UK: "GBP",
      Germany: "EUR",
      Unknown: "USD",
    };

    const currency = currencyMap[location];

    const result = detectFraud({ amount, location });

    const query = `
      INSERT INTO transactions (amount, location, currency, is_fraud, reasons)
      VALUES ($1, $2, $3, $4, $5)
    `;

    const values = [
      amount,
      location,
      currency,
      result.isFraud,
      result.reasons,
    ];

    await pool.query(query, values);

    console.log("Auto transaction:", amount, location, currency);
  } catch (error) {
    console.error("Generator error:", error);
  }
};

// 🔹 Start generator
const startGenerator = () => {
  if (!intervalId) {
    intervalId = setInterval(generateTransaction, 5000);
    console.log("Generator started");
  }
};

// 🔹 Stop generator
const stopGenerator = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    console.log("Generator stopped");
  }
};

module.exports = { startGenerator, stopGenerator };