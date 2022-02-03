import express from 'express';
import Transaction from '../models/transaction.model.js';

const router = express.Router();

router.route("/").get((req, res) => {
    Transaction.find()
        .then(transactions => res.json(transactions))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/create").post(async (req, res) => {
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
});

router.route("/:id").put(async (req, res) => {
    const transaction = await Transaction.findOne({ _id: req.params.id });
    for (let [key, val] of Object.entries(req.body)) {
        transaction[key] = val;
    };

    transaction.save()
        .then(() => res.json(transaction))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
    Transaction.findByIdAndDelete({ _id: req.params.id })
        .then(() => res.json("deleted"))
        .catch(err => res.status(400).json("Error: " + err));
});

export default router;