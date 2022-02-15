import axios from "axios";

const API_URL = 'http://localhost:5001/api/v1/transactions';

// Get all transactions for logged in user
export const getTransactions = async () => {
    try {
        const { token } = JSON.parse(localStorage.getItem("user")); 
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.get(API_URL, config);
        
        if(response.data) {
            localStorage.setItem("transactions", JSON.stringify(response.data));
        }

        return response.data;
    } catch (err) {
        return null;
    }
}

export const createTransaction = async transactionData =>  {
    try {
        const { token } = JSON.parse(localStorage.getItem("user")); 
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.post(API_URL, transactionData, config);
        const { data } = response;
        
        let state = JSON.parse(localStorage.getItem("transactions"));
        state.push(data);
        localStorage.setItem("transactions", JSON.stringify(state));

        return state;
    } catch (err) {
        return null;
    }
}

export const deleteTransaction = async id => {
    try {
        const { token } = JSON.parse(localStorage.getItem("user")); 
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        await axios.delete(`${API_URL}/${id}`, config);
        
        let state = JSON.parse(localStorage.getItem("transactions"));
        state = state.filter(transaction => transaction._id !== id);
        localStorage.setItem("transactions", JSON.stringify(state));

        return state;
    } catch (err) {
        return null;
    }
}