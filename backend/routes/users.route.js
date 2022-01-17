import express from 'express';
import User from '../models/user.model.js';

const router = express.Router();

router.route("/").get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
    const user = new User({
        username: req.body.username
    });

    user.save()
        .then(() => res.json("User added!"))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").put((req, res) => {
    User.findByIdAndUpdate({ _id: req.params.id }, {
        username: username
    }, (err, result) => {
        if (err) res.status(400).json("Error: " + err)
        else {
            res.json("Updated!");
        }
    });
});

router.route("/:id").delete((req, res) => {
    User.findOneAndDelete({ _id: req.params.id })
        .then(() => res.json("Deleted!"))
        .catch(err => res.status(400).json("Error: " + err));
})

export default router;