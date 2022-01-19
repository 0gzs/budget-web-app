import React, { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';

const AddTransaction = () => {
    const typeClasses = { red: "bg-red-600", green: "bg-green-600 justify-end" }
    const amountClasses = { red: "text-red-600", green: "text-green-600" }

    const [typeColor, setTypeColor] = useState(typeClasses.red);
    const [amountColor, setAmountColor] = useState(amountClasses.red);

    const [initialState, setInitialState] = useState({
        description: "",
        date: new Date().toLocaleDateString(),
        amount: 0.00,
        type: 0,
        category: "",
        account: ""
    });
    const [transaction, setTransaction] = useState(initialState);

    const handleInputChange = (e, name) => setTransaction({ ...transaction, [name]: e.target.value });

    const handleType = () => setTransaction({ ...transaction, type: transaction.type === 0 ? 1 : 0 });

    useEffect(() => {
        setTypeColor(typeColor === typeClasses.red ? typeClasses.green : typeClasses.red);
        setAmountColor(amountColor === amountClasses.red ? amountClasses.green : amountClasses.red);
    }, [transaction.type, typeColor, typeClasses.red, typeClasses.green, amountClasses.red, amountClasses.green, amountColor])

    return (
        <div>
            <div className='flex items-center bg-red-100'>
                <input className='appearance-non placeholder-italic border px-[0.125rem] py-[0.175rem]' type="text" placeholder='Description' />
                <div className={`flex border px-[0.125rem] py-[0.175rem] w-[80px] rounded-lg hover:cursor-pointer ${typeColor}`} onClick={handleType}>
                    <button 
                        className="border w-1/2 rounded-md bg-white">
                        <i className="bi bi-dash font-bold"></i>
                    </button>
                </div>
                <div className={`border-b border-gray-300 flex items-center w-[80px] ${amountColor}`}>
                    <p className="mr-[-8px]">$</p>
                    <input 
                        id="amountInput" 
                        className="p-2 max-w-full bg-transparent border-none leading-tight focus:outline-none font-medium" onChange={(e => handleInputChange(e, "amount"))} 
                        name="amount"
                        type="number" 
                        min="0" 
                        step="0.01" 
                        data-number-to-fixed="2" 
                        data-number-stepfactor="100"
                        value={parseFloat(transaction.amount).toFixed(2)} />
                </div>
            </div>
        </div>
    );
};

export default AddTransaction;