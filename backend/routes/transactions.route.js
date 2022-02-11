import express from 'express';
import { 
    deleteTransaction,
    getTransactions, 
    setTransactions, 
    updateTransaction
} from '../controllers/transactions.controller.js';

const router = express.Router();

router.route("/").get(getTransactions).post(setTransactions);
router.route("/:id").put(updateTransaction).delete(deleteTransaction);

export default router;