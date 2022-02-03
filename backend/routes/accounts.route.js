import express from 'express';

import Account from '../models/account.model.js';

const router = express.Router();

router.route("/").get((req, res) => {
    Account.find()
        .then(accounts => res.json(accounts))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/create").post((req, res) => {
    const account = new Account({
        name: req.body.name,
        balance: req.body.balance,
        type: req.body.type,
        user: req.body.user
    });
    
    account.save()
        .then(account => res.json(account))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
    Account.find({ user: req.params.id })
        .then(accounts => res.json(accounts))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").put(async (req, res) => {
    Account.findOneAndUpdate({ _id: req.params.id },
        { $set: { [req.body.field]: parseFloat(req.body.data) } })
        .then(account => res.json(account))
        .catch(err => res.status(400).json("Errors: " + err));
});

router.route("/:id/update/transaction").put(async (req, res) => {
    Account.updateOne({ _id: req.params.id },
        { $push: { transactions: req.body.transactionId } })
        .then(account => res.json(account))
        .catch(err => console.log(err));
})

router.route("/:id/transaction").put(async (req, res) => {
   Account.findByIdAndUpdate({ _id: req.params.id },
        { $inc: { balance: parseFloat(-req.body.amount)}})
        .then(account => res.json(account._id))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id/transaction/delete").put(async (req, res) => {
    Account.findByIdAndUpdate({ _id: req.params.id },
        { $inc: { balance: parseFloat(req.body.amount) }})
        .then(account => res.json(account._id))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
    Account.findByIdAndDelete(req.params.id)
        .then(() => res.json("deleted"))
        .catch(err => res.status(400).json("Error: " + err));
});

export default router;