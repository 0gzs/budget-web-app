import express from 'express';
import Category from '../models/category.model.js';

const router = express.Router();

router.route("/").get((req, res) => {
    Category.find()
        .then(categories => res.json(categories))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
    const { name, icon, color } = req.body;
    const user = "61df6b800b7ab5b94fbb4497";
    
    const category = new Category({ name, icon, color, amount: 0, user });
    
    category.save()
        .then(category => res.json(category))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").put(async (req, res) => {
    Category.findByIdAndUpdate({ _id: req.params.id },
        { $set: { [req.body.field]: req.body.data } })
        .then(category => res.json(category))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id/transaction").put(async (req, res) => {
    Category.findByIdAndUpdate({ _id: req.params.id }, 
        { $inc: { amount: -req.body.amount } })
        .then(category => res.json(category._id))
        .catch(err => res.status(400).json("Error: " + err))
});

router.route("/:id").delete((req, res) => {
    Category.findByIdAndDelete(req.params.id)
        .then(() => res.json("deleted"))
        .catch(err => res.status(400).json("Error: " + err));
});

export default router;