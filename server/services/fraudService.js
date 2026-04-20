const HIGH_AMOUNT_THRESHOLD = 10000;
const SUSPICIOUS_LOCATIONS = ["Unknown", "Offshore"];

const detectFraud = (transaction) => {
  let isFraud = false;
  let reasons = [];

  const { amount, location } = transaction;

  // Rule 1: High transaction amount
  if (amount > HIGH_AMOUNT_THRESHOLD) {
    isFraud = true;
    reasons.push("Amount exceeds high-value threshold");
  }

  // Rule 2: Suspicious location
  if (SUSPICIOUS_LOCATIONS.includes(location)) {
    isFraud = true;
    reasons.push("Transaction from suspicious location");
  }

  return {
    isFraud,
    reasons,
  };
};

module.exports = detectFraud;