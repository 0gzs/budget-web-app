import express from 'express';

import Account from '../models/account.model.js';

const router = express.Router();

router.route("/").get((req, res) => {
    Account.find()
        .then(accounts => res.json(accounts))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
    const { name, balance, type, user } = req.body;

    const account = new Account({ name, balance: parseFloat(balance), type, user });
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
    if (req.body.field === "balance") req.body.data =  parseFloat(req.body.data);
    Account.findOneAndUpdate({ _id: req.params.id },
        { $set: { [req.body.field]: req.body.data } })
        .then(account => res.json(account))
        .catch(err => res.status(400).json("Errors: " + err));
});

router.route("/:id/transaction").put(async (req, res) => {
    Account.findByIdAndUpdate({ _id: req.params.id },
        { $inc: { balance: -req.body.amount } })
        .then(account => res.json(account._id))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id/transaction/delete").put(async (req, res) => {
    Account.findByIdAndUpdate({ _id: req.params.id },
        { $inc: { balance: req.body.amount }})
        .then(account => res.json(account._id))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
    Account.findByIdAndDelete(req.params.id)
        .then(() => res.json("deleted"))
        .catch(err => res.status(400).json("Error: " + err));
});

export default router;