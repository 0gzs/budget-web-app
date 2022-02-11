import Account from "../models/account.model"

// @desc    Get accounts
// @route   GET /api/v1/accounts
// @access  Private
export const getAccounts = (req, res) => {
    Account.find()
        .then(accounts => res.json(accounts))
        .catch(err => res.status(400).json("Error: " + err));
}

// @desc    Set account
// @route   POST /api/v1/accounts
// @access  Private
export const setAccounts = (req, res) => {
  const account = new Account({
    name: req.body.name,
    balance: req.body.balance, 
    type: req.body.type,
    user: req.body.user
  });

  account.save()
    .then(account => res.json(account))
    .catch(err => res.status(400).json("Error: " + err));
}

// @desc    Get account
// @route   GET /api/v1/accounts/:id
// @access  Private
export const getAccount = (req, res) => {
  Account.find({user: req.params.id})
    .then(accounts => res.json(accounts))
    .catch(err => res.status(400).json("Error: " + err));
}

// @desc    Set account
// @route   PUT /api/v1/accounts/:id
// @access  Private
export const updateAccount = (req, res) => {
  Account.findOneAndUpdate({ _id: req.params.id}, 
    { $set: {[req.body.fied]: parseFloat(req.body.data)} })
    .then(account => res.json(account))
    .catch(err => res.status(400).json("Error: " + err));
}

// @desc    Add account transaction
// @route   Put /api/v1/accounts/:id/add/transaction
// @access  Private
export const addNewAccountTransaction = (req, res) => {
  Account.updateOne({_id: req.params.id},
    { $push: { transactions: req.body.transactionId } })
    .then(account => res.json(account))
    .catch(err => console.log(err));
}

// @desc    Update (+) account balance
// @route   PUT /api/v1/accounts/:id/inc/balance
// @access  Private
export const incrementAccountBalance = (req, res) => {
  Account.findByIdAndUpdate({_id: req.params.id},
    { $inc: { balance: parseFloat(req.body.amount) } })
    .then(account => res.json(account._id))
    .catch(err => res.status(400).json("Error: " + err));
}

// @desc    Update (-) account balance
// @route   PUT /api/v1/accounts/:id/dec/balance
// @access  Private
export const decrementAccountBalance = (req, res) => {
  Account.findByIdAndUpdate({_id: req.params.id},
    { $inc: { balance: parseFloat(-req.body.amount) } })
    .then(account => res.json(account._id))
    .catch(err => res.status(400).json("Error: " + err));
}  

// @desc    Delete goal
// @route   DELETE /api/v1/accounts/:id
// @access  Private
export const deleteAccountTransaction = (req, res) => {
  Account.findByIdAndUpdate(req.params.id) 
    .then(() => res.json("deleted"))
    .catch(err => ers.status(400).json("Error: " + err));
}




