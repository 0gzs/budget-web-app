import React, { useState, useMemo } from 'react';
import TransactionRequest from '../services/transaction-request.service';
import TypeButton from './type-btn.component';

const TransactionForm = ({ hideForm, updateState, handleAccounts, handleCategories }) => {
    const categories = JSON.parse(localStorage.getItem("categories"));
    const accounts = JSON.parse(localStorage.getItem("accounts"));
    
    let typeClasses = useMemo(() => {
        return { red: "bg-darkred", green: "bg-green-600 justify-end" }
    }, []);
    let amountClasses = useMemo(() => {
         return { red: "text-darkred", green: "text-green-600" }
    }, []);

    const [typeColor, setTypeColor] = useState(typeClasses.red);
    const [amountColor, setAmountColor] = useState(amountClasses.red);

    const initialState = {
        description: "",
        date: new Date(),
        amount: "0.00",
        type: 0,
        category: "",
        account: ""

    }
    const [transaction, setTransaction] = useState(initialState);

    const handleInput = (e, name) => setTransaction({ ...transaction, [name]: e.target.value });

    const handleType = () => {
        setTransaction({ ...transaction, type: transaction.type === 0 ? 1 : 0 });
        setTypeColor(typeColor === typeClasses.red ? typeClasses.green : typeClasses.red);
        setAmountColor(typeColor === amountClasses.red ? amountClasses.green : amountClasses.red);
    };

    return (
        <div className='w-[95%] px-6 py-5 rounded-md
                        items-center bg-dark
                        shadow-inner absolute bottom-2  
                        flex flex-col self-center
                        focus:outline-none  
                        space-y-4 text-carbon-text'>
            <div className='w-full flex space-x-3 font-source'>
                <input 
                    type="text"
                    placeholder='description'
                    value={transaction.description}
                    onChange={e => handleInput(e, "description")}
                    className='bg-carbonlight px-3 py-2
                                rounded-md uppercase font-big 
                                tracking-widest w-2/3 focus:outline-none text-white' />
                <TypeButton typeColor={typeColor} handle={handleType} />
            </div>
            <div className='w-full flex space-x-3'>
                <input 
                    type="date" 
                    value={transaction.date}
                    onChange={e => handleInput(e, "date")}
                    className='bg-carbonlight px-3 py-2
                                rounded-md uppercase font-big
                                tracking-widest w-2/3 focus:outline-none' />
                    
                <input 
                    type="text"
                    value={transaction.amount}
                    placeholder='$0.00'
                    onChange={e => handleInput(e, "amount")}
                    className={`bg-carbonlight px-3 py-2
                                  rounded-md uppercase font-huge
                                  tracking-widest w-1/3 focus:outline-none
                                  font-sans ${amountColor}`} />
            </div>
            <div className='w-full flex space-x-3'>
                <select 
                    value={transaction.category}
                    onChange={e => handleInput(e, "category")}
                    className='bg-carbonlight px-3 py-2
                    rounded-md uppercase font-big
                    tracking-widest w-1/2 focus:outline-none' >
                    <option>-Category</option>
                    {categories && categories.map((category, i) => {
                        return <option key={i} 
                                    className='text-white font-medium font-sans' 
                                    value={category._id}
                                    onChange={e => handleInput(e, "category")}> {category.name} </option>
                    })}
                </select>
                <select 
                    value={transaction.category}
                    onChange={e => handleInput(e, "account")}
                    className='bg-carbonlight px-3 py-2
                    rounded-md uppercase font-big
                    tracking-widest w-1/2 focus:outline-none' >
                    <option>-Account-</option>
                    {accounts && accounts.map((account, i) => {
                        return <option key={i} 
                                    className='text-white font-medium font-sans' 
                                    value={account._id}
                                    onChange={e => handleInput(e, "account")}> {account.name} </option>
                    })}
                </select>
            </div>
            <div className='w-full flex space-x-2 font-sans'>
                <button onClick={hideForm}
                    className='w-1/3 text-white rounded-sm 
                                   text-lg px-3 py-2 bg-carbonlight 
                                   uppercase font-huge hover:bg-darkred'>Nvm.</button>
                <button onClick={() => TransactionRequest.saveTransaction(transaction, updateState, handleAccounts, handleCategories)}
                    className='w-2/3 text-white rounded-sm 
                                   text-lg px-3 py-2 bg-moneygreen 
                                   uppercase font-huge'>Take My 💸</button>
            </div>
        </div>
    );
};

export default TransactionForm;