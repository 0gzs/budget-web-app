import express from 'express';
import { 
    deleteTransaction,
    getTransactions, 
    setTransactions, 
    updateTransaction
} from '../controllers/transactions.controller.js';
import {protect} from '../middleware/authMiddleware.js';

const router = express.Router();

router.route("/").get(protect, getTransactions).post(protect, setTransactions);
router.route("/:id").put(protect, updateTransaction).delete(protect, deleteTransaction);

export default router;
