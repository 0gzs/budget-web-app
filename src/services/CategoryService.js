import http from '../http-common';

export async function getAllCategories() {
    try {
        const response = await http.get("/api/v1/categories");
        const { data } = response;
        localStorage.setItem("categories", JSON.stringify(data));

        return data;
    }   catch (err) {
        return null;
    }
}

export async function createCategory(category) {
    try {
        const response = await http.post("/api/v1/categories", category);
        const { data } = response;

        let state = JSON.parse(localStorage.getItem("categories"));
        state.push(data);
        localStorage.setItem("categories", JSON.stringify(state));

        return state;
    } catch (err) {
        return null;
    }
}

export async function deleteCategory(id) {
    try {
        await http.delete(`/api/v1/categories/${id}`);

        let state = JSON.parse(localStorage.getItem("categories"));
        state = state.filter(category => category._id !== id);
        localStorage.setItem("categories", JSON.stringify(state));

        return state;
    } catch (err) {
        return null;
    }
}

export async function addCategoryTransaction(transaction) {
    try {
        await http.put(`/api/v1/categories/${transaction.category}/dec/amount`, { amount: transaction.amount });

        let state = JSON.parse(localStorage.getItem("categories"));
        state = state.map(category => {
            if (category._id === transaction.category) {
                category.amount -= transaction.amount;
                return category;
            }
            return category;
        });
        localStorage.setItem("categories", JSON.stringify(state));

        return state;
    } catch (err) {
        return null;
    }
}

export async function removeCategoryTransaction(transaction) {
    try {
        await http.put(`/api/v1/categories/${transaction.category}/transaction/delete`, { amount: transaction.amount });

        let state = JSON.parse(localStorage.getItem("categories"));
        state = state.map(category => {
            if (category._id === transaction.category) {
                category.amount += transaction.amount;
                return category;
            }
            return category;
        });
        localStorage.setItem("categories", JSON.stringify(state));

        return state;
    } catch (err) {
        return null;
    }
}

export async function updateCategory(id, data, field) {
    try {
        await http.put(`/api/v1/categories/${id}`, { data, field });
        
        let state = JSON.parse(localStorage.getItem("categories"));
        state = state.map(category => {
            if (category._id === id) {
                category[field] = data;
                return category;
            }
            return category;
        });
        localStorage.setItem("categories", JSON.stringify(state));

        return state;
    } catch (err) {
        return null; 
    }
}