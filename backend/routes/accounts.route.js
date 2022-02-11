import express from 'express';
import { 
    addNewAccountTransaction, 
    decrementAccountBalance, 
    deleteAccountTransaction, 
    getAccount, 
    getAccounts, 
    incrementAccountBalance, 
    setAccounts, 
    updateAccount 
} from '../contollers/accounts.controller.js';

const router = express.Router();

router.route("/").get(getAccounts).post(setAccounts);
router.route("/:id").get(getAccount).put(updateAccount).delete(deleteAccountTransaction);
router.route("/:id/add/transaction").put(addNewAccountTransaction);
router.route("/:id/inc/balance").put(incrementAccountBalance);
router.route("/:id/dec/balance").put(decrementAccountBalance);

export default router;