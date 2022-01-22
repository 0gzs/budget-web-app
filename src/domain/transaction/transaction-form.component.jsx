import React, { useState, useMemo } from 'react';
import ButtonGroup from '../../components/form/button-group.component';
import TransactionsService from './services/transactions.service';

const TransactionForm = ({ close, handleUpdate, }) => {
    let typeClasses = useMemo(() => {
        return { red: "bg-red-600", green: "bg-green-600 justify-end" }
    }, []);
    let amountClasses = useMemo(() => {
         return { red: "text-red-600", green: "text-green-600" }
    }, []);

    const [typeColor, setTypeColor] = useState(typeClasses.red);
    const [amountColor, setAmountColor] = useState(amountClasses.red);

    const [initialState, setInitialState] = useState({
        description: "",
        date: new Date(),
        amount: 0.00,
        type: 0,
        category: "",
        account: ""
    });
    const [transaction, setTransaction] = useState(initialState);
    const [categories, setCategories] = useState(JSON.parse(localStorage.getItem("categories")));
    const [accounts, setAccounts] = useState(JSON.parse(localStorage.getItem("accounts")));

    const handleInputChange = (e, name) => setTransaction({ ...transaction, [name]: e.target.value });

    const handleType = () => {
        setTransaction({ ...transaction, type: transaction.type === 0 ? 1 : 0 });
        setTypeColor(typeColor === typeClasses.red ? typeClasses.green : typeClasses.red);
        setAmountColor(typeColor === amountClasses.red ? amountClasses.green : amountClasses.red);
    };

    const saveTransaction = () => {
        TransactionsService.create(transaction)
            .then(res => handleUpdate(res.data, "add"))
            .catch(err => console.log(err));
        close();
    };

    return (
        <div className='flex flex-col space-y-2'>
            <input 
                className='p-2 appearance-non placeholder-italic border rounded-md w-full'
                type="text" 
                placeholder='Description' 
                onChange={e => handleInputChange(e, "description")} />
            <div className="flex items-center space-x-2">
                <input 
                    className="text-sm w-1/2 border rounded-md py-2"
                    type="date" 
                    name="date"
                    onChange={e => handleInputChange(e, "date")}
                    value={transaction.date} />
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
                        value={parseFloat(transaction.amount).toFixed(2)}
                        onChange={e => handleInputChange(e, "amount")} />
                </div>
            </div>
            <div className='flex space-x-2'>
                <select 
                    className="w-1/2 focus:outline-none px-2 py-1 form-select appearance-none block text-base font-normal text-gray-500 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:outline-none" aria-label="Default select example"
                    onChange={e => handleInputChange(e, "category")}
                    value={transaction.category}
                    >
                        <option>-Select-</option>
                        {categories.map((category, i) => {
                            return <option key={i} value={category._id}>{category.name}</option>
                        })}
                </select>
                <select 
                    className="w-1/2 focus:outline-none px-2 py-1 form-select appearance-none block text-base font-normal text-gray-500 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:outline-none" aria-label="Default select example"
                    onChange={e => handleInputChange(e, "account")}
                    value={transaction.account}
                    >
                        <option>-Select-</option>
                        {accounts.map((account, i) => {
                            return <option key={i} value={account._id}>{account.name}</option>
                        })}
                </select>
            </div>
            <ButtonGroup close={close} submit={saveTransaction} />
        </div>
    );
};

export default TransactionForm;