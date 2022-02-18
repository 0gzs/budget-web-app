import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { createTransaction, deleteTransaction, getTransactions, reset } from '../../features/transactions/transactionsSlice';
import { addAccountTransaction, pushTransaction, removeAccountTransaction } from '../../features/accounts/accountsSlice';
import { addCategoryTransaction, removeCategoryTransaction } from '../../features/categories/categoriesSlice';

import Transaction from './transaction.component';
import TransactionLoader from './loader.component';
import TransactionForm from './form/index.component';

const Transactions = () => {
    const [show, setShow] = useState(false);
    const [updating, setUpdating] = useState(-1);

    const showForm = () => setShow(true);
    const hideForm = () => setShow(false);

    const { transactions, isLoading, isError, message } = useSelector(state => state.transactions);
    const { categories } = useSelector(state => state.categories);
    const { accounts } = useSelector(state => state.accounts);

    const dispatch = useDispatch();

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        dispatch(getTransactions());

        return () => {
            dispatch(reset());
        }
    }, [isError, dispatch, message]);

    const submit = async transaction => {
        hideForm();
        const { description, date, amount, type, category, account } = transaction;

        if (!description || !date || !amount || !category || !account) {
            toast('Hmm. Some fields seem to be missing');
            return showForm();
        }

        if (parseFloat(amount).toString() === 'NaN') {
            toast('Please enter a number')
            return showForm();
        }

        const selectedAccount = accounts.filter(account => account._id === transaction.account)[0];

        if (accounts.length <= 0 || categories.length <= 0) {
            toast('You need accounts and categories before you can add a transaction!');
            return hideForm();
        };

        if (selectedAccount.balance < transaction.amount) {
            toast("❗️😰 Oops! Looks like that account might be a bit short.");
            return showForm();
        };
        
        const transactionData = {
            description,
            date,
            amount,
            type,
            category,
            account
        }

        const response = await dispatch(createTransaction(transactionData));
        const savedTransaction = response.payload;
        
        dispatch(addAccountTransaction(savedTransaction));

        dispatch(pushTransaction(selectedAccount._id, savedTransaction._id));

        dispatch(addCategoryTransaction(savedTransaction));
    }

    const deleteOne = async transaction => {
        setUpdating(transaction._id);

        dispatch(deleteTransaction(transaction._id));

        const selectedAccount = accounts.filter(account => account._id === transaction.account)[0];

        
        if (accounts && selectedAccount) {
            dispatch(removeAccountTransaction(transaction));
        };
        
        if (categories && transaction.type !== 1) {
            dispatch(removeCategoryTransaction(transaction));
        }

        setUpdating(-1);
    };
    
    return (
        <div className='card h-full'>
            <h1 className='card-title'>transactions</h1>
            <div className='bg-carbonlight w-full flex-1 p-2 flex flex-col space-y-1 overflow-x-auto no-scrollbar'>
                {transactions && transactions.length > 0 ? (
                    transactions.map((transaction, i) => {
                        if (updating === transaction._id && isLoading) return <TransactionLoader key={i} />
                        return (
                            <Transaction 
                                key={i} 
                                transaction={transaction} 
                                deleteOne={deleteOne} />
                        );
                    })) :
                    <p className='italic text-gray-400 text-center font-mono'>No transactions yet</p>
                }
            </div>
            <button className='card-btn' onClick={showForm}>
                <i className='bi bi-plus card-icon'></i>
                new transaction
            </button>

            {show && 
                <TransactionForm 
                    hide={hideForm} 
                    submit={submit} />}
        </div>
    );
};

export default Transactions;