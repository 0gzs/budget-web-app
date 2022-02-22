import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import transactionService from './transactionService';

const initialState = {
    transactions: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const createTransaction = createAsyncThunk('transactions/create', async (transactionData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await transactionService.createTransaction(transactionData, token);
    } catch (error) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const getTransactions = createAsyncThunk('transactions/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await transactionService.getTransactions(token);
    } catch (error) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const deleteTransaction = createAsyncThunk('transactions/delete', async (transactionData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await transactionService.deleteTransaction(transactionData, token);
    } catch (error) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const deleteTransactions = createAsyncThunk('transactions/delte/multi', async (accountId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await transactionService.deleteTransactions(accountId, token)
    } catch (error) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const transactionSlice = createSlice({
    name: 'transactions',
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
            .addCase(createTransaction.pending, state => {
                state.isLoading = true;
            })
            .addCase(createTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.transactions.push(action.payload);
            })
            .addCase(createTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.transactions = null;
            })
            .addCase(getTransactions.pending, state => {
                state.isLoading = true;
            })
            .addCase(getTransactions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.transactions = action.payload;
            })
            .addCase(getTransactions.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.transactions = null;
            })
            .addCase(deleteTransaction.pending, state => {
                state.isLoading = true;
            })
            .addCase(deleteTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.transactions = state.transactions.filter(transaction => transaction._id !== action.payload.id);
            })
            .addCase(deleteTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.transactions = null;
            })
            .addCase(deleteTransactions.pending, state => {
                state.isLoading = true;
            })
            .addCase(deleteTransactions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.transactions = state.transactions.filter(transaction => transaction.account !== action.payload.id);
            })
            .addCase(deleteTransactions.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.transactions = null;
            })
    }
})

export const { reset } = transactionSlice.actions;
export default transactionSlice.reducer;