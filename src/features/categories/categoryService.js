import axios from "axios";

const API_URL = '/api/v1/categories';

const getCategories = async token => {
    const config = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config);
    
    return response.data;
}

const createCategory = async (categoryData, token) => {
    const config = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, categoryData, config);

    return response.data;
}

const deleteCategory = async (id, token) => {
    const config = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(`${API_URL}/${id}`, config);
    
    return response.data;
}

const addCategoryTransaction = async (transaction, token) => {
    const config = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.put(`${API_URL}/${transaction.category}/dec/amount`, { amount: transaction.amount }, config);
    
    return response.data;
}

const removeCategoryTransaction = async (transaction, token) => {
    const config = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        }
    };
    
    const response = await axios.put(`${API_URL}/${transaction.category}/inc/amount`, { amount: transaction.amount }, config);

    return response.data;
}

const updateCategory = async (id, categoryData, field, token) => {
    const config = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(`${API_URL}/${id}`, { [field]: categoryData }, config);

    const data = {
        field,
        category: response.data
    }

    return data;
}

const categoryService = {
    getCategories,
    createCategory,
    addCategoryTransaction,
    removeCategoryTransaction,
    updateCategory,
    deleteCategory
};

export default categoryService;