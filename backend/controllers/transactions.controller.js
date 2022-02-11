import asyncHandler from 'express-async-handler';
import Transaction from "../models/transaction.model.js";

// @desc    Get transactions
// @route   GET /api/v1/transactions
// @access  Private
export const getTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find();

  res.status(200).json(transactions);
})

// @desc    Set transactions
// @route   POST /api/v1/transactions
// @access  Private
export const setTransactions = asyncHandler(async (req, res) => {
  if (!req.body.description && !req.body.date && !req.body.amount && !req.body.type && !req.body.category && !req.body.account) {
    res.status(400);
    throw new Error("Please add all required fields");
  }

  const transaction = await Transaction.create({
    description: req.body.description,
    date: Date.parse(req.body.date),
    amount: req.body.amount,
    type: req.body.type,
    category: req.body.category,
    account: req.body.account
  });

  res.status(200).json(transaction);
})

// @desc    Update transactions
// @route   PUT /api/v1/transactions/:id
// @access  Private
export const updateTransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    res.status(400);
    throw new Error("Transaction not found");
  }

  const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
    new: true,    
  });

  res.status(200).json(updatedTransaction);
})

// @desc    Delete transactions
// @route   DELETE /api/v1/transactions/:id
// @access  Private
export const deleteTransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    res.status(400);
    throw new Error("Transaction not found");
  }

  await transaction.remove();

  res.status(200).json({ id: req.params.id });
})
