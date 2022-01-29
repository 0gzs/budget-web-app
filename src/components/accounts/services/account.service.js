import http from "../../../http-common";

const AccountService = {
    getAll: () => {
        return http.get("/api/v1/accounts");
    },

    get: id => {
        return http.get("/api/v1/accounts/" + id);
    },
    
    create: data => {
        return http.post("/api/v1/accounts/add", data);
    },

    update: (id, data, field) => {
        return http.put("/api/v1/categories/" + id, { data, field })
    },

    delete: id => {
        return http.delete("/api/v1/accounts/" + id);
    },

    transaction: (id, amount) => {
        return http.put(`/api/v1/accounts/${id}/transaction`, { amount: amount});
    },

    transactionDelete: (id, amount) => {
        return http.put(`/api/v1/accounts/${id}/transaction/delete`, { amount: amount});
    }
};

export default AccountService;