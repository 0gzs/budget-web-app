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
        let index;
        if (component === "accounts") {
            state = [...accounts];
            let index;
            for (let i = 0; i < state.length; i++) {
                if (state[i]._id === id) index = i;
            }
            state[index].balance -= amount;
            return updateAccount(state);
        }

        state = [...categories];
        for (let i = 0; i < state.length; i++) {
            if (state[i]._id === id) return index = i;
        }
        state[index].amount -= amount;
        return updateCategory(state);
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
                        <Transaction transaction={transaction} updateState={deleteTransaction} key={i} />
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