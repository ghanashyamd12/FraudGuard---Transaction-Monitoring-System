const detectFraud = require("../services/fraudService");
const pool = require("../db/db");

// 🔹 Add Transaction
const addTransaction = async (req, res) => {
  try {
    const { amount, location, currency } = req.body;

    if (amount === undefined || !location) {
      return res.status(400).json({
        message: "Amount and location are required",
      });
    }

    // 🔥 IMPORTANT: await (since detectFraud is async now)
    const result = await detectFraud({ amount, location });

    const query = `
      INSERT INTO transactions 
      (amount, location, currency, is_fraud, reasons, fraud_score)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const values = [
      amount,
      location,
      currency || "USD", // fallback
      result.isFraud,
      result.reasons,
      result.fraudScore,
    ];

    const dbResponse = await pool.query(query, values);

    res.status(200).json({
      message: "Transaction stored successfully",
      transaction: dbResponse.rows[0],
    });

  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};


// 🔹 Get All Transactions
const getTransactions = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM transactions ORDER BY created_at DESC"
    );

    res.status(200).json({
      transactions: result.rows,
    });

  } catch (error) {
    console.error("Error fetching transactions:", error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};


// ✅ Export BOTH
module.exports = { addTransaction, getTransactions };