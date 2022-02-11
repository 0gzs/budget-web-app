import express from 'express';

import { 
    decrementCategoryAmount, 
    getCategories, 
    incrementCategoryAmount, 
    setCategories, 
    updateCategory 
} from '../contollers/categories.controller.js';
import { deleteCategory } from '../../src/services/CategoryService.js';

const router = express.Router();

router.route("/").get(getCategories).post(setCategories);
router.route("/:id").put(updateCategory).delete(deleteCategory);
router.route("/:id/inc/amount").put(incrementCategoryAmount);
router.route("/:id/dec/amount").put(decrementCategoryAmount);

export default router;