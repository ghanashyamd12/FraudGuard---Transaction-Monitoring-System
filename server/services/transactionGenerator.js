const pool = require("../db/db");
const detectFraud = require("./fraudService");

// Locations
const safeLocations = ["India", "USA", "UK", "Germany"];

// 🔹 Interval reference
let intervalId = null;

// 🔹 Generate transaction
const generateTransaction = async () => {
  try {
    let amount;
    let location;

    const rand = Math.random();

    // 🔴 HIGH RISK (30%)
    if (rand < 0.3) {
      amount = Math.floor(12000 + Math.random() * 10000);
      location = "Unknown";

    // 🟡 MEDIUM RISK (30%)
    } else if (rand < 0.6) {
      amount = Math.floor(5000 + Math.random() * 8000);
      location = "USA";

    // 🟢 SAFE (40%)
    } else {
      amount = Math.floor(100 + Math.random() * 4000);
      location =
        safeLocations[Math.floor(Math.random() * safeLocations.length)];
    }

    // Currency mapping
    const currencyMap = {
      India: "INR",
      USA: "USD",
      UK: "GBP",
      Germany: "EUR",
      Unknown: "USD",
    };

    const currency = currencyMap[location] || "USD";

    // 🔥 ML + Rule Detection
    const result = await detectFraud({ amount, location });

    // 🔥 INSERT WITH FRAUD SCORE
    const query = `
      INSERT INTO transactions 
      (amount, location, currency, is_fraud, reasons, fraud_score)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;

    const values = [
      amount,
      location,
      currency,
      result.isFraud,
      result.reasons,
      result.fraudScore,
    ];

    await pool.query(query, values);

    console.log(
      `Auto TX → ${amount} ${currency} | ${location} | Fraud: ${result.isFraud} | Score: ${result.fraudScore.toFixed(2)}`
    );

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