import express from 'express';
import { 
    addTransaction, 
    decrementAccountBalance, 
    deleteAccount, 
    getAccounts, 
    getOneAccount, 
    incrementAccountBalance, 
    setAccounts, 
    updateAccount 
} from '../contollers/accounts.controller.js';

const router = express.Router();

router.route("/").get(getAccounts).post(setAccounts);
router.route("/:id").get(getOneAccount).put(updateAccount).delete(deleteAccount);
router.route("/:id/add/transaction").put(addTransaction);
router.route("/:id/inc/balance").put(incrementAccountBalance);
router.route("/:id/dec/balance").put(decrementAccountBalance);

export default router;