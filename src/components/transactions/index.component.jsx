import React, { useState } from 'react';
import Transaction from './transaction.component';
import TransactionForm from './form/index.component';

const Transactions = ({ transactions, updateState, handleCategories, handleAccounts }) => {
    const [show, setShow] = useState(false);

    const showForm = () => setShow(true);
    const hideForm = () => setShow(false);

    return (
        <div className='card h-full'>

            <h1 className='card-title'> Transactions </h1>

            <div className='w-full flex-1 flex flex-col
                            space-y-2 bg-carbonlight 
                            p-4 relative overflow-y-auto no-scrollbar
                            rounded-md'>
                {transactions && transactions.map((transaction, i) => {
                    return (
                        <Transaction transaction={transaction} updateState={updateState} handleAccounts={handleAccounts} handleCategories={handleCategories} key={i} />
                    );
                })}

                { show && <TransactionForm hideForm={hideForm} updateState={updateState} handleAccounts={handleAccounts} handleCategories={handleCategories} /> }
            </div>

            <button onClick={showForm}
                className='card-btn'>
                    <i className='bi bi-plus card-icon'></i>
                        New Transaction</button>
        </div>
    );
};

export default Transactions;