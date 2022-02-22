import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import accountsService from './accountService';

const initialState = {
    accounts: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const createAccount = createAsyncThunk('accounts/create', async (accountData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await accountsService.createAccount(accountData, token);
    } catch (error) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message);
    }
});

export const getAccounts = createAsyncThunk('accounts/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await accountsService.getAccounts(token)
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

export const updateAccount = createAsyncThunk('accounts/update', async (updateData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await accountsService.updateAccount(updateData, token);
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

export const pushTransaction = createAsyncThunk(`accounts/push/transaction`, async (data, thunkAPI) => {
    try {
        const { id, transactionId } = data;
        const token = thunkAPI.getState().auth.user.token;
        return await accountsService.pushTransaction(id, transactionId, token);
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

export const addAccountTransaction = createAsyncThunk('accounts/dec/balance', async (transactionData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await accountsService.addAccountTransaction(transactionData, token);
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

export const removeAccountTransaction = createAsyncThunk('accounts/inc/balance', async (transactionData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await accountsService.removeAccountTransaction(transactionData, token)
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

export const deleteAccount = createAsyncThunk('accounts/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await accountsService.deleteAccount(id, token);
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

export const accountsSlice = createSlice({
    name: 'accounts',
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
            .addCase(createAccount.pending, state => {
                state.isLoading = true;
            })
            .addCase(createAccount.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.accounts.push(action.payload)
            })
            .addCase(createAccount.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getAccounts.pending, state => {
                state.isLoading = true;
            })
            .addCase(getAccounts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.accounts = action.payload;
            })
            .addCase(getAccounts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.accounts = null;
            })
            .addCase(updateAccount.pending, state => {
                state.isLoading = true;
            })
            .addCase(updateAccount.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.accounts = state.accounts.map(a => {
                    const { field, account } = action.payload;
                    
                    if (a._id === account._id) {
                        a[field] = account[field];
                        return a;
                    }
                    return a;
                });
            })
            .addCase(updateAccount.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.accounts = null;
            })
            .addCase(pushTransaction.pending, state => {
                state.isLoading = true;
            })
            .addCase(pushTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.accounts = state.accounts.map(account => {
                    if (account._id === action.payload._id) {
                        account.transactions.push(action.payload._id);
                        return account;
                    }
                    return account;
                });
            })
            .addCase(pushTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.accounts = null;
            })
            .addCase(addAccountTransaction.pending, state => {
                state.isLoading = true;
            })
            .addCase(addAccountTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.accounts = state.accounts.map(account => {
                    if (account._id === action.payload._id) {
                        account.balance = action.payload.balance;
                        return account;
                    }
                    return account;
                });
            })
            .addCase(addAccountTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.accounts = null;
            })
            .addCase(removeAccountTransaction.pending, state => {
                state.isLoading = true;
            })
            .addCase(removeAccountTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.accounts = state.accounts.map(account => {
                    if (account._id === action.payload._id) {
                        account.balance = action.payload.balance;
                        return account;
                    }
                    return account;
                });
            })
            .addCase(removeAccountTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.accounts = null;
            })
            .addCase(deleteAccount.pending, state => {
                state.isLoading = true;
            })
            .addCase(deleteAccount.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.accounts = state.accounts.filter(account => account._id !== action.payload.id);
            })
            .addCase(deleteAccount.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.accounts = null;
            })
    }
});

export const { reset } = accountsSlice.actions;
export default accountsSlice.reducer;