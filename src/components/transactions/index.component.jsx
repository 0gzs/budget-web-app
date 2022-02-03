import React, { useState } from 'react';

import { createTransaction, deleteTransaction } from '../../services/TransactionService';
import { addAccountTransaction, pushTransaction, removeAccountTransaction } from '../../services/AccountService';
import { addCategoryTransaction, removeCategoryTransaction } from '../../services/CategoryService';

import Transaction from './transaction.component';
import TransactionLoader from './loader.component';
import TransactionForm from './form/index.component';

const Transactions = ({ transactions, handleState, handleCategories, handleAccounts }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);

    const showForm = () => setShow(true);
    const hideForm = () => setShow(false);

    const saveTransaction = async transaction => {
        let accounts = JSON.parse(localStorage.getItem("accounts"));
        let categories = JSON.parse(localStorage.getItem("categories"));
        
        if (accounts.length <= 0 || categories.length <= 0) {
            setIsLoading(false);
            return hideForm();
        };

        hideForm();
        setIsLoading(true);

        const transactions = await createTransaction(transaction);
        handleState(transactions);

        transaction = transactions[transactions.length - 1];

        accounts = await addAccountTransaction(transaction);
        let savedAccount = accounts[accounts.length - 1];

        accounts = await pushTransaction(savedAccount._id, transaction._id);
        handleAccounts(accounts);

        categories = await addCategoryTransaction(transaction);
        handleCategories(categories);
        
        setIsLoading(false);
    }

    const deleteOne = async transaction => {
        let accounts;
        let categories;

        const transactions = await deleteTransaction(transaction._id);
        handleState(transactions);

        accounts = await removeAccountTransaction(transaction);
        handleAccounts(accounts);

        categories = await removeCategoryTransaction(transaction);
        handleCategories(categories);
    };
    
    return (
        <div className='card h-full'>
            {show && 
                <TransactionForm
                    hideForm={hideForm}
                    submit={saveTransaction} />
            }
            <h1 className='card-title'> Transactions </h1>

            <div className='w-full flex-1 flex flex-col
                            space-y-2 bg-carbonlight 
                            p-4 relative overflow-y-auto no-scrollbar
                            rounded-md'>

                { isLoading && <TransactionLoader /> }
                { !isLoading && transactions ?
                    transactions.map((transaction, i) => {
                        return <Transaction 
                            key={i} 
                            transaction={transaction} 
                            deleteOne={deleteOne} />
                    }) : null
                }
            </div>

            <button onClick={showForm}
                className='card-btn'>
                    <i className='bi bi-plus card-icon'></i>
                        New Transaction</button>
        </div>
    );
};

export default Transactions;