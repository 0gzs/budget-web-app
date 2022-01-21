import http from '../../../http-common';

const TransactionService = {
    getAll: () => {
        return http.get("/api/v1/transactions");
    },

    get: id => {
        return http.get("/api/v1/transactions/" + id);
    },
    
    create: data => {
        console.log(data);
        return http.post("/api/v1/transactions/add", data);
    },

    delete: id => {
        return http.delete("/api/v1/transactions/" + id);
    }
};

export default TransactionService;