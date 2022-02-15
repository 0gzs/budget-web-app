import React, { useState } from 'react';

import Transaction from './transaction.component';
import TransactionLoader from './loader.component';
import TransactionForm from './form/index.component';

const Transactions = ({ transactions, handleState, handleAccounts, handleCategories }) => {
    const [updating, setUpdating] = useState(-1);
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);

    const showForm = () => setShow(true);
    const hideForm = () => setShow(false);
    
    return (
        <div className='card h-full'>
            <h1 className='text-2xl text-white font-extrabold font-source'>transactions</h1>
            <div className='bg-carbonlight w-full flex-1 p-2 flex flex-col space-y-1 overflow-x-auto no-scrollbar'>
                {transactions && 
                    transactions.map((transaction, i) => {
                        if (updating === transaction._id && isLoading) return <TransactionLoader key={i} />
                        return (
                            <Transaction 
                                key={i} 
                                transaction={transaction} 
                                hide={hideForm}
                                handleState={handleState}
                                updating={setUpdating}
                                loading={setIsLoading}
                                handleAccounts={handleAccounts}
                                handleCategories={handleCategories} />
                        );
                    }
                )}
            </div>
            <button className='card-btn' onClick={showForm}>
                <i className='bi bi-plus card-icon'></i>
                new transaction
            </button>

            {show && 
                <TransactionForm 
                    handleState={handleState}
                    hide={hideForm}
                    loading={setIsLoading}
                    handleAccounts={handleAccounts}
                    handleCategories={handleCategories} />}
        </div>
    );
};

export default Transactions;