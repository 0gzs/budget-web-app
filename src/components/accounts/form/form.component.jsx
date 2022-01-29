import React, { useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import AccountService from '../services/account.service';
import TransactionService from '../../transactions/services/transaction.service';

const AccountForm = ({ hideForm, update, addTransaction }) => {
    const [account, setAccount] = useState({
        name: "",
        balance: 0,
        type: "",
        user: localStorage.getItem("userId")
    })

    const handleInputChange = (val, name) => setAccount({ ...account, [name]: val });

    const saveAccount = async () => {
        await AccountService.create(account)
            .then(res => update(res.data))
            .catch(err => console.log(err));
        hideForm();
    };

    return (
        <div className='p-4 bg-dark absolute bottom-10
                        left-10 right-10 flex flex-col
                        space-y-3 z-10'>
            <h1 className='text-2xl font-source font-huge uppercase tracking-wide text-center'>Add an account</h1>
            <input 
                type="text"
                value={account.name}
                placeholder="ex. '🐷 Bank'" 
                className='bg-carbonlight px-3 py-2
                rounded-md tracking-widest
                focus:outline-none                        
                font-huge w-full'
                onChange={e => handleInputChange(e.target.value, "name")}/>

            <div className='flex space-x-2'>
                <CurrencyInput
                    className='bg-carbonlight px-3 py-2
                    rounded-md uppercase tracking-widest
                    focus:outline-none                        
                    font-huge w-1/3'
                    placeholder="0"
                    defaultValue={account.balance}
                    decimalsLimit={2}  
                    onChange={e => handleInputChange(e.target.value, "balance")} />
                <select 
                    className='bg-carbonlight px-3 py-2
                    rounded-md uppercase font-big
                    tracking-widest w-2/3 focus:outline-none' 
                    value={account.type}
                    onChange={e => handleInputChange(e.target.value, "type")} >
                    <option>-Type-</option>
                    <option className='text-white font-medium font-sans' 
                        value={0}
                        onChange={e => handleInputChange(e.target.value, "type")}> Checking </option>
                    <option className='text-white font-medium font-sans' 
                        value={1}
                        onChange={e => handleInputChange(e.target.value, "type")}> Savings </option>
                </select>
            </div>
            <div className='w-full flex space-x-2 font-sans'>
                <button onClick={hideForm}
                    className='w-1/3 text-white rounded-md shadow-inner
                                   text-lg px-3 py-2 bg-carbonlight 
                                   uppercase font-huge hover:bg-darkred'>Nvm.</button>
                <button onClick={saveAccount}
                    className='w-2/3 text-white rounded-md shadow-inner
                                   text-lg px-3 py-2 bg-moneygreen 
                                   uppercase font-huge'>Go</button>
            </div>
        </div>
    );
};

export default AccountForm;