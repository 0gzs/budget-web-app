import axios from "axios";

const API_URL = 'http://localhost:5001/api/v1/categories';

export const getCategories = async () => {
    try {
        const { token } = JSON.parse(localStorage.getItem("user")); 
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.get(API_URL, config);
        
        if (response.data) {
            localStorage.setItem("categories", JSON.stringify(response.data));
        }

        return response.data;
    }   catch (err) {
        return null;
    }
}

export const createCategory = async categoryData => {
    try {
        const { token } = JSON.parse(localStorage.getItem("user")); 
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.post(API_URL, categoryData, config);
        const { data } = response;

        let state = JSON.parse(localStorage.getItem("categories"));
        state.push(data);
        localStorage.setItem("categories", JSON.stringify(state));

        return state;
    } catch (err) {
        return null;
    }
}

export const deleteCategory = async id => {
    try {
        const { token } = JSON.parse(localStorage.getItem("user")); 
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        await axios.delete(`${API_URL}/${id}`, config);

        let state = JSON.parse(localStorage.getItem("categories"));
        state = state.filter(category => category._id !== id);
        localStorage.setItem("categories", JSON.stringify(state));

        return state;
    } catch (err) {
        return null;
    }
}

export const addCategoryTransaction = async (transaction) => {
    try {
        const { token } = JSON.parse(localStorage.getItem("user"));
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };
        await axios.put(`${API_URL}/${transaction.category}/dec/amount`, { amount: transaction.amount }, config);

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

export const removeCategoryTransaction = async transaction => {
    try {
        const { token } = JSON.parse(localStorage.getItem("user"));
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };
        console.log(transaction.amount)
        await axios.put(`${API_URL}/${transaction.category}/inc/amount`, { amount: transaction.amount }, config);

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

export const updateCategory = async (id, categoryData, field) => {
    try {
        const { token } = JSON.parse(localStorage.getItem("user")); 
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.put(`${API_URL}/${id}`, { [field]: categoryData }, config);
        const { data } = response;
        
        let state = JSON.parse(localStorage.getItem("categories"));
        state = state.map(category => {
            if (category._id === id) {
                category[field] = data[field];
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