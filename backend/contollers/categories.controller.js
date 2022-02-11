import Category from '../models/category.model.js';

// @desc    Get categories
// @route   GET /api/v1/categories
// @access  Private
export const getCategories = (req, res) => {
    Category.find()
        .then(categories => res.json(categories))
        .catch(err => res.status(400).json("Error: " + err));
}

// @desc    Set categories
// @route   POST /api/v1/categories
// @access  Private
export const setCategories = (req, res) => {
    const { name, icon, color } = req.body;
    const user = "61df6b800b7ab5b94fbb4497";
    
    const category = new Category({ name, icon, color, amount: 0, user });
    
    category.save()
        .then(category => res.json(category))
        .catch(err => res.status(400).json("Error: " + err));
}

// @desc    Update category
// @route   PUT /api/v1/categories/:id
// @access  Private
export const updateCategory = async (req, res) => {
    const { data, field } = req.body;
    
    Category.findByIdAndUpdate({ _id: req.params.id },
        { $set: { [field]:  data } })
        .then(category => res.json(category))
        .catch(err => res.status(400).json("Error: " + err));
}

// @desc    Update category
// @route   PUT /api/v1/categories/:id/inc/amount
// @access  Private
export const incrementCategoryAmount = async (req, res) => {
    Category.findByIdAndUpdate({ _id: req.params.id },
        { $inc: { amount: parseFloat(req.body.amount) }})
        .then(category => res.json(category._id))
        .catch(err => res.status(400).json("Error: " + err));
}

// @desc    Update category
// @route   PUT /api/v1/categories/:id/dec/amount
// @access  Private
export const decrementCategoryAmount = async (req, res) => {
    Category.findByIdAndUpdate({ _id: req.params.id }, 
        { $inc: { amount: parseFloat(-req.body.amount) } })
        .then(category => res.json(category._id))
        .catch(err => res.status(400).json("Error: " + err))
}

// @desc    Delete category
// @route   DELETE /api/v1/categories/:id
// @access  Private
export const deleteCategory = (req, res) => {
    Category.findByIdAndDelete(req.params.id)
        .then(() => res.json("deleted"))
        .catch(err => res.status(400).json("Error: " + err));
}