import React, { useState } from 'react';
import Account from './account.component';
import AccountForm from './form/form.component';

const Accounts = ({ accounts, updateState, updateTransactions }) => {
    const transactions = JSON.parse(localStorage.getItem("transactions"));
    const [show, setShow] = useState(false);

    const showForm = () => setShow(true);
    const hideForm = () => setShow(false);

    const deleteAccount = id => {
        let state = [...accounts];
        state = state.filter(account => account._id !== id);
        updateState(state);
    };

    const addAccount = account => {
        let state = [...accounts];
        state.push(account);
        updateState(state);
    };

    const addTransaction = transaction => {
        let state = [...transactions];
        state.push(transaction);
        updateTransactions(state);
    };

    return (
        <div className='card'>
            { show && <AccountForm hideForm={hideForm} update={addAccount} addTransaction={addTransaction} /> }
            <h1 className='card-title'>Accounts </h1>   
            <div className='w-full flex p-3 space-y-1 overflow-x-auto
                          bg-carbonlight rounded-lg flex-col max-h-32'>
                {accounts && accounts.map((account, i) => {
                    return (
                        <Account key={i} account={account} remove={deleteAccount} />
                    );
                })}

            </div>            
            <button className='card-btn' onClick={showForm}>
                <i className='bi bi-plus card-icon'></i>
                Add an account
            </button>
        </div>
    );
};

export default Accounts;