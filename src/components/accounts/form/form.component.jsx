import React from 'react';
import useForm from '../../../hooks/useForm.hook';
import { createAccount, pushTransaction } from '../../../services/AccountService';
import { createTransaction } from '../../../services/TransactionService';

const AccountForm = ({ handleState, hide, loading, handleTransactions }) => {
    const initialState = {
        name: "",
        balance: "",
        type: ""
    };

    const validations = [
        ({ name }) => isRequired(name) || { name: 'An account name is required' },
        ({ balance }) => isANumber(balance) || { balance: 'Choose a numeric amount' },
        ({ type }) => isRequired(type) || { type: 'Savings or checking?' },
    ]
    const { values, changeHandler, errors, touched, submitHandler } = useForm(initialState, validations, submit);

    function isRequired(value) {
        return value !== null && value.trim().length > 0;
    }

    function isANumber(value) {
        return !isNaN(value) && !value !== null && value.trim().length > 0;
    }

    async function submit(account) {
        hide();
        loading(true);
        
        const accountData = {
            name: account.name, 
            balance: account.balance, 
            type: account.type
        }

        let accounts = await createAccount(accountData);
        let savedAccount = accounts[accounts.length - 1];

        const transactions = await createTransaction({
            description: `Deposit to ${account.name}`,
            date: new Date(),
            amount: account.balance,
            type: 1,
            category: "Income",
            account: savedAccount._id
        });
        handleTransactions(transactions);
        let savedTransaction = transactions[transactions.length - 1];

        accounts = await pushTransaction(savedAccount._id, savedTransaction._id);
        handleState(accounts);
        
        loading(false);
    };

    return (
        <div className='modal'>
            <div className='form-container'>
                <h1 className='form-title'>add account</h1>
                <div className='form'>
                    <div className='w-full'>
                        <label className="font-label">account name:</label>
                        <input 
                            className="form-input focus:outline focus:outline-3 focus:outline-cyan-200"
                            type="text"
                            name="name"
                            placeholder='ex. Piggy 🐷  Bank'
                            value={values.name}
                            onChange={changeHandler} />
                        <div>
                            {(touched.name && errors.name) || touched.empty ? 
                                <p className='error'>{errors.name}</p> :
                                <p className='error opacity-0'>none</p>}
                        </div>
                    </div>
                    <div className='w-full flex space-x-2 items-center'>
                        <div className='w-full'>
                            <label className="font-label">balance:</label>
                            <input 
                                className="form-input focus:outline focus:outline-3 focus:outline-cyan-200"
                                type="text"
                                name="balance"
                                placeholder='$0.00'
                                value={values.balance}
                                onChange={changeHandler} />
                            <div>
                                {(touched.balance && errors.balance) || touched.empty ? 
                                    <p className='error'>{errors.balance}</p> :
                                    <p className='error opacity-0'>none</p>}
                            </div>
                        </div>
                        <div className='w-full'>
                            <label className="font-label">type:</label>
                            <select
                                className="form-input focus:outline focus:outline-3 focus:outline-cyan-200"
                                name="type"
                                value={values.type}
                                onChange={changeHandler}>
                                    <option value={null}>--Select--</option>
                                    <option
                                        value={0}
                                        onChange={changeHandler}>Checking</option>
                                    <option
                                        value={0}
                                        onChange={changeHandler}>Savings</option>
                            </select>
                            <div>
                                {(touched.type && errors.type) || touched.empty ? 
                                    <p className='error'>{errors.type}</p> :
                                    <p className='error opacity-0'>none</p>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='form-btn-group'>
                    <button onClick={hide} className='btn-cancel'>
                        cancel
                    </button>
                    <button onClick={submitHandler} className='btn-submit'>
                        submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccountForm;