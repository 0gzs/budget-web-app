import http from '../../../http-common';

const CategoryService = {
    getAll: () => {
        return http.get("/api/v1/categories");
    },

    get: id => {
        return http.get("/api/v1/categories/" + id);
    },
    
    create: data => {
        console.log(data);
    }
};

export default CategoryService;