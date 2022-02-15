import asyncHandler from 'express-async-handler';
import Transaction from "../models/transaction.model.js";
import User from '../models/user.model.js';

// @desc    Get transactions
// @route   GET /api/v1/transactions
// @access  Private
export const getTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({ user: req.user.id });

  res.status(200).json(transactions);
})

// @desc    Set transactions
// @route   POST /api/v1/transactions
// @access  Private
export const setTransactions = asyncHandler(async (req, res) => {
  console.log("Here")
  const { description, date, amount, type, category, account } = req.body;

  if (!description && !date && !amount && !type && !category && !account ) {
    res.status(400);
    throw new Error("Please add all required fields");
  }

  const transaction = await Transaction.create({
    description,
    date: Date.parse(date),
    amount,
    type,
    category,
    account,
    user: req.user.id
  });
  console.log(transaction);

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

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (transaction.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
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

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (transaction.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }


  await transaction.remove();

  res.status(200).json({ id: req.params.id });
})
