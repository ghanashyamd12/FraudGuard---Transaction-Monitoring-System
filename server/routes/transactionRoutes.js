const express = require("express");
const router = express.Router();

const { addTransaction, getTransactions } = require("../controllers/transactionController");

// POST: Add Transaction
router.post("/add", addTransaction);

// GET: Fetch All Transactions
router.get("/", getTransactions);

module.exports = router;