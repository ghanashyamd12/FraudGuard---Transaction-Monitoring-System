const detectFraud = require("../services/fraudService");
const pool = require("../db/db");

// 🔹 Add Transaction
const addTransaction = async (req, res) => {
  try {
    const { amount, location } = req.body;

    if (amount === undefined || !location) {
      return res.status(400).json({
        message: "Amount and location are required",
      });
    }

    const result = detectFraud({ amount, location });

    const query = `
      INSERT INTO transactions (amount, location, is_fraud, reasons)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    const values = [
      amount,
      location,
      result.isFraud,
      result.reasons,
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