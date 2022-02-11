import express from 'express';

import { 
    decrementCategoryAmount, 
    getCategories, 
    incrementCategoryAmount, 
    setCategories, 
    updateCategory,
    deleteCategory
} from '../controllers/categories.controller.js';

const router = express.Router();

router.route("/").get(getCategories).post(setCategories);
router.route("/:id").put(updateCategory).delete(deleteCategory);
router.route("/:id/inc/amount").put(incrementCategoryAmount);
router.route("/:id/dec/amount").put(decrementCategoryAmount);

export default router;