import http from "../http-common";

export async function getAllAccounts() {
    try {
        const response = await http.get("/api/v1/accounts");
        const { data } = response;
        localStorage.setItem("accounts", JSON.stringify(data));
        
        return data;
    } catch (err) {
        return null;
    }
}

export async function createAccount(account) {
    try {
        const response = await http.post("/api/v1/accounts/", account);
        const { data } = response;
        
        let state = JSON.parse(localStorage.getItem("accounts"));
        state.push(data);
        localStorage.setItem("accounts", JSON.stringify(state));
        
        return state;
    } catch (err) {
        return null;
    }
}

export async function deleteAccount(id) {
    try {
        await http.delete(`/api/v1/accounts/${id}`);
        
        let state = JSON.parse(localStorage.getItem("accounts"));
        state = state.filter(account => account._id !== id);
        localStorage.setItem("accounts", JSON.stringify(state));
        
        return state;
    } catch (err) {
        return null;
    }
}

export async function pushTransaction(id, transactionId) {
    try {
        await http.put(`/api/v1/accounts/${id}/add/transaction`, { transactionId: transactionId});

        let state = JSON.parse(localStorage.getItem("accounts"));
        state = state.map(account => {
            if (account._id === id) {
                account.transactions.push(transactionId);
                return account;
            }
            return account;
        });
        localStorage.setItem("accounts", JSON.stringify(state));

        return state;
    } catch (err) {
        return null;
    }
}

export async function addAccountTransaction(transaction) {
    try {
        await http.put(`/api/v1/accounts/${transaction.account}/dec/balance`, { amount: transaction.amount });

        let state = JSON.parse(localStorage.getItem("accounts"));
        state = state.map(account => {
            if (account._id === transaction.account) {
                account.balance -= transaction.amount
                return account;
            }
            return account;
        });
        localStorage.setItem("accounts", JSON.stringify(state));

        return state;
    } catch (err) {
        return null;
    }
}

export async function removeAccountTransaction(transaction) {
    try {
        await http.put(`/api/v1/accounts/${transaction.account}/inc/balance`, { amount: transaction.amount });

        let state = JSON.parse(localStorage.getItem("accounts"));
        state = state.map(account => {
            if (account._id === transaction.account) {
                account.balance += transaction.amount;
                return account;
            }
            return account;
        });
        localStorage.setItem("accounts", JSON.stringify(state));

        return state;
    } catch (err) {
        return null;
    }
}