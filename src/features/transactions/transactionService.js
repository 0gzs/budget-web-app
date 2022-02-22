import http from '../../http-common';

const API_URL = '/api/v1/transactions';

// Get all transactions for logged in user
const getTransactions = async (accountId, token) => {
    const config = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }
    const response = await http.get(API_URL, accountId, config);

    return response.data;
}

const createTransaction = async (transactionData, token) =>  {
    const config = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }
    const response = await http.post(API_URL, transactionData, config);

    return response.data;
}

const deleteTransaction = async (id, token) => {
    const config = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }
    const response = await http.delete(`${API_URL}/${id}`, config);

    return response.data;
}

const deleteTransactions = async (accountId, token) => {
    const config = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
    }
    const response = await http.delete(`${API_URL}/${accountId}/multi`, config);

    return response.data;
}

const transactionService = {
    createTransaction,
    getTransactions,
    deleteTransaction,
    deleteTransactions
}

export default transactionService;