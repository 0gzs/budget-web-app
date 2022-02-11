import Transaction from "../models/transaction.model.js";

// @desc    Get transactions
// @route   GET /api/v1/transactions
// @access  Private
export const getTransactions = (req, res) => {
    Transaction.find()
        .then(transactions => res.json(transactions))
        .catch(err => res.status(400).json("Error: " + err));
}

// @desc    Set transactions
// @route   POST /api/v1/transactions
// @access  Private
export const setTransactions = async (req, res) => {
    const transaction = new Transaction({ 
        description: req.body.description, 
        date: Date.parse(req.body.date), 
        amount: req.body.amount, 
        type: req.body.type, 
        category: req.body.category, 
        account: req.body.account
    });
    
    transaction.save()
        .then(transaction => res.json(transaction))
        .catch(err => res.status(400).json("Error: " + err));
}

// @desc    Update transactions
// @route   PUT /api/v1/transactions/:id
// @access  Private
export const updateTransaction = async (req, res) => {
    const transaction = await Transaction.findOne({ _id: req.params.id });
    for (let [key, val] of Object.entries(req.body)) {
        transaction[key] = val;
    };

    transaction.save()
        .then(() => res.json(transaction))
        .catch(err => res.status(400).json("Error: " + err));
}

// @desc    Delete transactions
// @route   DELETE /api/v1/transactions/:id
// @access  Private
export const deleteTransaction = (req, res) => {
    Transaction.findByIdAndDelete({ _id: req.params.id })
        .then(() => res.json("deleted"))
        .catch(err => res.status(400).json("Error: " + err));
}