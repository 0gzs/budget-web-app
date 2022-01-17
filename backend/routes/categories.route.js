import express from 'express';
import Category from '../models/category.model.js';

const router = express.Router();

router.route("/").get((req, res) => {
    Category.find()
        .then(categories => res.json(categories))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
    const { name, icon, color, amount } = req.body;
    const user = "61df6b800b7ab5b94fbb4497";
    
    const category = new Category({ name, icon, color, amount, user });
    
    category.save()
        .then(category => res.json(category))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").put(async (req, res) => {
    const category = await Category.findOne({ _id: req.params.id });
    for (let [key, val] of Object.entries(req.body)) {
        category[key] = val;
    };

    category.save()
        .then(() => res.json(category))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
    Category.findByIdAndDelete(req.params.id)
        .then(category => res.json(category))
        .catch(err => res.status(400).json("Error: " + err));
});

export default router;