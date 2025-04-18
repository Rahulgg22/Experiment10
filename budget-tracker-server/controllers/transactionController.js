const Transaction = require("../models/Transaction");

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTransaction = async (req, res) => {
  const { type, amount, category, description, date } = req.body;

  // Basic validation
  if (!type || !amount || !category || !description || !date) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newTransaction = new Transaction(req.body);
    const saved = await newTransaction.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const deleted = await Transaction.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTransaction = async (req, res) => {
  const { type, amount, category, description, date } = req.body;

  // Basic validation
  if (!type || !amount || !category || !description || !date) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const updated = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
