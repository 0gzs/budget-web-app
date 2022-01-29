import AccountService from "./account.service";
import TransactionRequest from '../../transactions/services/transaction-request.service';

const AccountRequest = {
    saveAccount: async (account, handleState, hide=null, updateTransaction) => {
        let state = JSON.parse(localStorage.getItem("accounts"));

        await AccountService.create(account)
            .then(async res => { 
                state.push(res.data); 
                handleState(state) 
                await TransactionRequest.newAccount(res.data, updateTransaction);
            })
            .catch(err => console.log(err));
        if (hide) hide();
    },

    addTransaction: async (id, amount, handleState) => {
        let state = JSON.parse(localStorage.getItem("accounts"));
        
        await AccountService.transaction(id, amount)
            .then(() => {
                state = state.map(account => {
                    if (account._id === id)  {
                        account.balance -= amount;
                        return account;
                    } 
                    return account 
                });
                handleState(state);
            })
            .catch(err => console.log(err))
    },

    removeTransaction: async (id, amount, handleState) => {
        let state = JSON.parse(localStorage.getItem("accounts"));
        let newAmount;
        state = state.map(a => {
            if (a._id === id) {
                a.balance += amount;
                newAmount = a.balance;
                return a;
            }
            return a;
        });

        await AccountService.update(id, newAmount, "balance")
            .then(() => handleState(state))
            .catch(err => console.log(err));
    },

    deleteOne: async (id, handleState) => {
        let state = JSON.parse(localStorage.getItem("accounts"));

        await AccountService.delete(id)
            .then(() => {
                state = state.filter(account => account._id !== id);
                handleState(state);
            })
            .catch(err => console.log(err));
    }
};

export default AccountRequest;