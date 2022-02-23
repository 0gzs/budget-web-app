import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoryService from './categoryService';

const initialState = {
    categories: JSON.parse(localStorage.getItem("categories")) || null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const createCategory = createAsyncThunk('categories/create', async (categoryData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await categoryService.createCategory(categoryData, token);
    } catch (error) {
        const message =
        (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const getCategories = createAsyncThunk('categories/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await categoryService.getCategories(token);
    } catch (error) {
        const message =
        (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const addCategoryTransaction = createAsyncThunk('categories/dec/amount', async (transactionData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await categoryService.addCategoryTransaction(transactionData, token);
    } catch (error) {
        const message =
        (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const removeCategoryTransaction = createAsyncThunk('categories/inc/amount', async (transactionData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await categoryService.removeCategoryTransaction(transactionData, token);
    } catch (error) {
        const message =
        (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const updateCategory = createAsyncThunk('categories/update', async (data, thunkAPI) => {
    try {
        const { id, categoryData, field } = data;
        const token = thunkAPI.getState().auth.user.token;
        return await categoryService.updateCategory(id, categoryData, field, token);
    } catch (error) {
        const message =
        (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const deleteCategory = createAsyncThunk('categories/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await categoryService.deleteCategory(id, token);
    } catch (error) {
        const message =
        (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        reset: state => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        },
    },
    extraReducers: builder => {
        builder
            .addCase(createCategory.pending, state => {
                state.isLoading = true;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                let categories = state.categories;
                if (categories) categories.push(action.payload);
                localStorage.setItem("categories", JSON.stringify(categories));
                state.categories = [...categories];
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
                state.categories = null;
            })
            .addCase(getCategories.pending, state => {
                state.isLoading = true;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                let categories = state.categories;
                if (!categories) categories = [...action.payload];
                localStorage.setItem("categories", JSON.stringify(categories));
                state.categories = [...categories];
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
                state.categories = null;
            })
            .addCase(updateCategory.pending, state => {
                state.isLoading = true;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                let categories = state.categories;
                if (categories) categories = categories.map(category => {
                    if (category._id === action.payload.category._id) {
                        const { field } = action.payload;
                        category[field] = action.payload.category[field];
                        return category;
                    }
                    return category;
                });
                localStorage.setItem("categories", JSON.stringify(categories));
                state.categories = [...categories];
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
                state.categories = null;
            })
            .addCase(addCategoryTransaction.pending, state => {
                state.isLoading = true;
            })
            .addCase(addCategoryTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                let categories = state.categories; 
                if (categories) categories = categories.map(category => {
                    if (category._id === action.payload._id) {
                        category.amount = action.payload.amount;
                    }
                    return category;
                });
                localStorage.setItem("categories", JSON.stringify(categories));
                state.categories = [...categories];
            })
            .addCase(addCategoryTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
                state.categories = null;
            })
            .addCase(removeCategoryTransaction.pending, state => {
                state.isLoading = true;
            })
            .addCase(removeCategoryTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                let categories = state.categories; 
                if (categories) categories = categories.map(category => {
                    if (category._id === action.payload._id) {
                        category.amount = action.payload.amount;
                    }
                    return category;
                });
                localStorage.setItem("categories", JSON.stringify(categories));
                state.categories = [...categories];
            })
            .addCase(removeCategoryTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
                state.categories = null;
            })
            .addCase(deleteCategory.pending, state => {
                state.isLoading = true;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                let categories = state.categories;
                if (categories) categories = categories.filter(account => account._id !== action.payload.id);
                localStorage.setItem("categories", JSON.stringify(categories));
                state.categories = [...categories];
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
                state.categories = null;
            })
    }
})

export const { reset } = categoriesSlice.actions;
export default categoriesSlice.reducer;
