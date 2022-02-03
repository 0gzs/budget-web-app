import http from "../http-common";

export async function getAllTransactions() {
    try {
        const response = await http.get("/api/v1/transactions");
        const { data } = response;
        localStorage.setItem("transactions", JSON.stringify(data));

        return data;
    } catch (err) {
        return null;
    }
}

export async function createTransaction(transaction) {
    try {
        const response = await http.post("/api/v1/transactions/create", transaction);
        const { data } = response;
        
        let state = JSON.parse(localStorage.getItem("transactions"));
        state.push(data);
        localStorage.setItem("transactions", JSON.stringify(state));

        return state;
    } catch (err) {
        return null;
    }
}

export async function deleteTransaction(id) {
    try {
        await http.delete(`/api/v1/transactions/${id}`);
        
        let state = JSON.parse(localStorage.getItem("transactions"));
        state = state.filter(transaction => transaction._id !== id);
        localStorage.setItem("transactions", JSON.stringify(state));

        return state;
    } catch (err) {
        return null;
    }
}