import express from 'express';
import { 
    deleteTransaction,
    getTransactions, 
    setTransactions, 
    updateTransaction
} from '../contollers/transactions.controller.js';

const router = express.Router();

router.route("/").get(getTransactions).post(setTransactions);
router.route("/:id").put(updateTransaction).delete(deleteTransaction);

export default router;