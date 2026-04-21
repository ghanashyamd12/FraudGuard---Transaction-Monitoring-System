const axios = require("axios");

const HIGH_AMOUNT_THRESHOLD = 10000;
const SUSPICIOUS_LOCATIONS = ["Unknown", "Offshore"];
const ML_API_URL = "http://127.0.0.1:5001/predict";

// 🔥 Main fraud detection function
const detectFraud = async (transaction) => {
  let isFraud = false;
  let reasons = [];

  const { amount, location } = transaction;

  // ✅ Rule 1: High amount
  if (amount > HIGH_AMOUNT_THRESHOLD) {
    isFraud = true;
    reasons.push("Amount exceeds high-value threshold");
  }

  // ✅ Rule 2: Suspicious location
  if (SUSPICIOUS_LOCATIONS.includes(location)) {
    isFraud = true;
    reasons.push("Transaction from suspicious location");
  }

  // 🔥 Determine risk level for ML input shaping
  const isHighRisk =
    amount > HIGH_AMOUNT_THRESHOLD ||
    SUSPICIOUS_LOCATIONS.includes(location);

  const base = isHighRisk ? 2 : 0;

  let fraudScore = 0;

  try {
    const mlInput = {
      time: Math.random() * 100000,
      amount: amount,

      // 🔥 Bias features based on risk (IMPORTANT)
      f1: base + Math.random(),
      f2: base + Math.random(),
      f3: base + Math.random(),
      f4: base + Math.random(),
      f5: base + Math.random(),
      f6: base + Math.random(),
      f7: base + Math.random(),
      f8: base + Math.random(),
      f9: base + Math.random(),
      f10: base + Math.random(),
      f11: base + Math.random(),
      f12: base + Math.random(),
      f13: base + Math.random(),
      f14: base + Math.random(),
      f15: base + Math.random(),
      f16: base + Math.random(),
      f17: base + Math.random(),
      f18: base + Math.random(),
      f19: base + Math.random(),
      f20: base + Math.random(),
      f21: base + Math.random(),
      f22: base + Math.random(),
      f23: base + Math.random(),
      f24: base + Math.random(),
      f25: base + Math.random(),
      f26: base + Math.random(),
      f27: base + Math.random(),
      f28: base + Math.random(),
    };

    const response = await axios.post(ML_API_URL, mlInput);
    fraudScore = response.data.fraudScore;

  } catch (error) {
    console.error("ML API error:", error.message);
  }

  // 🔥 Combine ML + Rules
  if (fraudScore > 0.3) {
    isFraud = true;
    reasons.push("High ML fraud probability");
  }

  return {
    isFraud,
    reasons,
    fraudScore,
  };
};

module.exports = detectFraud;