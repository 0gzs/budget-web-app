import React, { useState } from 'react';
import Transaction from './transaction.component';
import TransactionForm from './form/index.component';

const Transactions = ({ transactions, updateState, updateCategory, updateAccount }) => {
    const categories = JSON.parse(localStorage.getItem("categories"));
    const accounts = JSON.parse(localStorage.getItem("accounts"));

    const [show, setShow] = useState(false);

    const showForm = () => setShow(true);
    const hideForm = () => setShow(false);

    const addTransaction = response => {
        let state = [...transactions];
        state.push(response);
        updateState(state);
    };

    const update = (component, id, amount) => {
        let state;
        if (component === "accounts") {
            state = accounts.map(account => {
                if (account._id === id) {
                    account.balance -= amount
                    return account;
                } 
                return account;
            })
            updateAccount(state);
            return;
        }
        if (component === "accountsReturn") {
            state = accounts.map(account => {
                if (account._id === id) {
                    account.balance += amount
                    return account;
                } 
                return account;
            })
            updateAccount(state);
            return;
        }

        if (component === "categoryReturn") {
            state = categories.map(category => {
                if (category._id === id) {
                    category._id += amount;
                    return category;
                }
                return category;
            })
        }

        state = categories.map(category => {
            if (category._id === id) {
                category.amount -= parseInt(amount)
                return category;
            } 
            return category;
        })
        updateCategory(state);
    };

    const deleteTransaction = id => {
        let state = [...transactions];
        state = state.filter(obj => obj._id !== id);
        updateState(state);
    };

    return (
        <div className='card h-full'>

            <h1 className='card-title'> Transactions </h1>

            <div className='w-full flex-1 flex flex-col
                            space-y-2 bg-carbonlight 
                            p-4 relative overflow-y-auto no-scrollbar
                            rounded-md'>
                {transactions && transactions.map((transaction, i) => {
                    return (
                        <Transaction transaction={transaction} updateState={deleteTransaction} update={update} key={i} />
                    );
                })}

                { show && <TransactionForm hideForm={hideForm} addTransaction={addTransaction} update={update} /> }
            </div>

            <button onClick={showForm}
                className='card-btn'>
                    <i className='bi bi-plus card-icon'></i>
                        New Transaction</button>
        </div>
    );
};

export default Transactions;