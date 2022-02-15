import axios from "axios";

const API_URL = 'http://localhost:5001/api/v1/accounts';

// Get all accounts for logged in user
export const getAccounts = async () => {
    try {
        const { token } = JSON.parse(localStorage.getItem("user"));
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };
        const response = await axios.get(API_URL, config);
        
        if (response.data) {
            localStorage.setItem('accounts', JSON.stringify(response.data));
        }
        
        return response.data;
    } catch (error) {
        return null
    }
}

export const createAccount = async accountData => {
    try {
        const { token } = JSON.parse(localStorage.getItem("user"));
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.post(API_URL, accountData, config);
        const { data } = response;
        
        let state = JSON.parse(localStorage.getItem("accounts"));
        state.push(data);
        localStorage.setItem("accounts", JSON.stringify(state));
        
        return state;
    } catch (err) {
        return null;
    }
}

// export async function deleteAccount(id) {
//     try {
//         await http.delete(`/api/v1/accounts/${id}`);
        
//         let state = JSON.parse(localStorage.getItem("accounts"));
//         state = state.filter(account => account._id !== id);
//         localStorage.setItem("accounts", JSON.stringify(state));
        
//         return state;
//     } catch (err) {
//         return null;
//     }
// }

export const pushTransaction = async (id, transactionId) => {
    try {
        const { token } = JSON.parse(localStorage.getItem("user"));
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };
        await axios.put(`${API_URL}/${id}/add/transaction`, { transactionId: transactionId }, config);

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

export const addAccountTransaction = async transaction => {
    try {
        const { token } = JSON.parse(localStorage.getItem("user"));
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };
        await axios.put(`${API_URL}/${transaction.account}/dec/balance`, { amount: transaction.amount }, config);

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

export const removeAccountTransaction = async transaction => {
    try {
        const { token } = JSON.parse(localStorage.getItem("user"));
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };

        await axios.put(`${API_URL}/${transaction.account}/inc/balance`, { amount: transaction.amount }, config);

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