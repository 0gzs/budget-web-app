import express from 'express';
import Transaction from '../models/transaction.model.js';
import Category from '../models/category.model.js';
import Account from '../models/account.model.js';

const router = express.Router();

router.route("/").get((req, res) => {
    Transaction.find()
        .then(transactions => res.json(transactions))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post(async (req, res) => {
    const { description, date, amount, type, category, account } = req.body;
    const transaction = new Transaction({ description, date: Date.parse(date), amount, type, category, account });
    
    // const categoryObject = await Category.findOne({ _id: category });
    // categoryObject.amount -= amount;
    // if (categoryObject.amount < 0) return res.status(400).json("Error: " + "Not enough money in the category.")
    // else await categoryObject.save();

    // const accountObject = await Account.findOne({ _id: account });
    // accountObject.amount -= amount;
    // if (accountObject.amount < 0) return res.status(400).json("Error: " + "Not enough money in that account")
    // else await accountObject.save();

    console.log(transaction);

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
        .then(() => res.json("Deteted!"))
        .catch(err => res.status(400).json("Error: " + err));
});

export default router;