import AccountRequest from "../../accounts/services/account-request.service";
import AccountService from "../../accounts/services/account.service";
import CategoryRequest from "../../categories/services/category-request.service";
import TransactionService from "./transaction.service";

const TransactionRequest = {

    saveTransaction: async (transaction, update, handleAccounts, hide=null, handleCategories=null) => {
        let state = JSON.parse(localStorage.getItem("transactions"));

        await TransactionService.create(transaction)
            .then(res => {
                state.push(res.data);
                update(state);
            })
            .catch(err => console.log(err));

        await AccountRequest.addTransaction(transaction.account, transaction.amount, handleAccounts);
        await CategoryRequest.addTransaction(transaction.category, transaction.amount, handleCategories);
        if (hide) hide();
    },

    newAccount: async (account, handleState) => {
        const { _id, name, balance } = account;
        let state = JSON.parse(localStorage.getItem("transactions"));

        let transaction = {
            description: `Deposit to ${name}`,
            date: new Date(),
            amount: balance,
            type: 1,
            category: "Income",
            account: _id
        }
        await TransactionService.create(transaction)
            .then(res => { 
                state.push(res.data); 
                handleState(state);
            })
            .catch(err => console.log(err));
    },

    deleteTransaction: async (transaction, handleState, handleAccounts, handleCategories) => {
        const { _id, account, category, amount } = transaction;
        let state = JSON.parse(localStorage.getItem("transactions"));
    
        await TransactionService.delete(_id)
            .then(() => {
                state = state.filter(t => t._id !== _id);
                handleState(state);
            })
            .catch(err => console.log(err));
        await AccountRequest.removeTransaction(account, amount, handleAccounts);
        await CategoryRequest.removeTransaction(category, amount, handleCategories);
        
    }
}

export default TransactionRequest;