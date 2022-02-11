import asyncHandler from 'express-async-handler';
import Category from '../models/category.model.js';

// @desc    Get categories
// @route   GET /api/v1/categories
// @access  Private
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();

 
  res.status(200).json(categories);
})

// @desc    Set categories
// @route   POST /api/v1/categories
// @access  Private
export const setCategories = asyncHandler(async (req, res) => {
  const user = "61df6b800b7ab5b94fbb4497";

  if (!req.body.name && !req.body.icon && !req.body.color) {
    res.status(400);
    throw new Error("Please add all required fields");
  }

  const category = await Category.create({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
    amount: 0,
    user: user
  });

  res.status(200).json(category);
})

// @desc    Update category
// @route   PUT /api/v1/categories/:id
// @access  Private
export const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(400);
    throw new Error("Category not found");
  }

  const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedCategory);
})

// @desc    Update category
// @route   PUT /api/v1/categories/:id/inc/amount
// @access  Private
export const incrementCategoryAmount = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(400);
    throw new Error("Category not found");
  }

  category.amount += parseFloat(req.body.amount);
  await category.save();

  res.status(200).json(category);
})

// @desc    Update category
// @route   PUT /api/v1/categories/:id/dec/amount
// @access  Private
export const decrementCategoryAmount = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(400);
    throw new Error("Category not found");
  }

  category.amount -= parseFloat(req.body.amount);
  await category.save();

  res.status(200).json(category);
})

// @desc    Delete category
// @route   DELETE /api/v1/categories/:id
// @access  Private
export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(400);
    throw new Error("Category not found");
  }

  await category.remove();

  res.status(200).json({ id: req.params.id });
})
