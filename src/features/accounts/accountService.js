import http from '../../http-common';

const API_URL = '/api/v1/accounts';

// Get all accounts for logged in user
const getAccounts = async token => {
    const config = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        }
    };
    const response = await http.get(API_URL, config);
    
    return response.data;
}

const createAccount = async (accountData, token) => {
    const config = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }
    const response = await http.post(API_URL, accountData, config);

    return response.data;
}

const updateAccount = async (updateData, token) => {
    const { id, data, field } = updateData;
    const config = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }
    
    const response = await http.put(API_URL + `/${id}`, { [field]: data }, config);

    const resposeData = {
        field,
        account: response.data
    }

    return resposeData;
}

const deleteAccount = async (id, token) => {
    const config = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }
    const response = await http.delete(`${API_URL}/${id}`, config);
    
    return response.data;
}

const pushTransaction = async (id, transactionId, token) => {
    const config = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        }
    };
    const response = await http.put(`${API_URL}/${id}/add/transaction`, { transactionId: transactionId }, config);

    return response.data;
}

const addAccountTransaction = async (transaction, token) => {
    const config = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        }
    };
    const response = await http.put(`${API_URL}/${transaction.account}/dec/balance`, { amount: transaction.amount }, config);

    return response.data;
}

const removeAccountTransaction = async (transaction, token) => {
    const config = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        }
    };

    const response = await http.put(`${API_URL}/${transaction.account}/inc/balance`, { amount: transaction.amount }, config);

    return response.data;
}

const accountsService = {
    getAccounts, 
    createAccount,
    updateAccount,
    pushTransaction,
    deleteAccount,
    addAccountTransaction,
    removeAccountTransaction
};

export default accountsService;