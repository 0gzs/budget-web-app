import http from '../../../http-common';

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

    delete: id => {
        return http.delete("/api/v1/accounts/" + id);
    }
};

export default AccountService;