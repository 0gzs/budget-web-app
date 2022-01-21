import React, { useCallback, useEffect, useState } from "react";  
import TransactionService from "./services/transactions.service";
import dollarUS from "../../services/currency-formatter";

const TransactionForm = ({ close, handleUpdate }) => {
    const [initialState, setInitialState] = useState({
        description: "",
        type: 0,
        amount: 0.00,
        category: "",
        date: "2022-01-01",
        account: ""
    });
    const [transaction, setTransaction] = useState(initialState);
    const [categories, setCategories] = useState();
    const [accounts, setAccounts] = useState();

    useEffect(() => {
        setCategories(JSON.parse(localStorage.getItem("categories")))
    }, []);
    useEffect(() => {
        setAccounts(JSON.parse(localStorage.getItem("accounts")))
    }, []);

    const handleType = () => {
        if (transaction.type === 0) setTransaction({ ...transaction, type: 1 })
        else setTransaction({ ...transaction, type: 0 });
    }

    const changeType = useCallback(() => {
        const typeElement = document.getElementById("type");
        const amountElement = document.getElementById("amountInput");

        if(transaction.type === 0) {
            typeElement.classList.remove("bg-green-600");
            typeElement.classList.add("bg-red-600");
            typeElement.classList.remove("justify-end");
            amountElement.classList.add("text-red-600");
            amountElement.classList.remove("text-green-600");
        } else {
            typeElement.classList.remove("bg-red-600");
            typeElement.classList.add("bg-green-600");
            typeElement.classList.add("justify-end");
            amountElement.classList.remove("text-red-600");
            amountElement.classList.add("text-green-600");
        }
    }, [transaction.type]);

    useEffect(() => {
        changeType();
    }, [changeType])

    const handleInputChange = (e, name) => setTransaction({ ...transaction, [name]: e.target.value });

    const saveTransaction = () => {
        const data = {
            description: transaction.description,
            date: transaction.date,
            amount: dollarUS.format(transaction.amount),
            type: transaction.type,
            category: transaction.category,
            account: transaction.account
        };

        TransactionService.create(data)
            .then(res => {
                setTransaction(initialState);
                // handleAddTransaction(res.data);
                close();
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="w-full flex flex-col">
            <p>{dollarUS.format(transaction.amount)}</p>
            <div className="w-full px-2 my-2 flex items-center space-x-2">
                <input 
                    type="text"
                    className="appearance-none w-2/4 border rounded-md focus:outline-none placeholder-italic p-2 w-4/5"
                    placeholder="Description" 
                    name="description"
                    onChange={e => handleInputChange(e, "description")}
                    value={transaction.description} />
                <div className="flex border px-[2px] py-[3px] w-[80px] rounded-lg hover:cursor-pointer" onClick={handleType} id="type">
                    <button className="border w-1/2 rounded-md bg-white">
                        <i className="bi bi-dash font-bold"></i>
                    </button>
                </div>
                <div className={`border-b border-gray-300 flex items-center w-[80px] ${transaction.type === 0 ? 'text-red-600' : 'text-green-600'}`}>
                    <p className="mr-[-8px]">$</p>
                    <input 
                        id="amountInput" 
                        className="p-2 max-w-full bg-transparent border-none leading-tight focus:outline-none font-medium" onChange={e => handleInputChange(e, "amount")} 
                        name="amount"
                        type="number" 
                        min="0" 
                        step="0.01" 
                        data-number-to-fixed="2" 
                        data-number-stepfactor="100"
                        value={parseFloat(transaction.amount).toFixed(2)} />
                </div>
            </div>
            <div className="w-full flex items-center px-2 my-2 space-x-3">
                <select className="bg-white w-1/3 border rounded-md p-2" onChange={e => handleInputChange(e, "category")}>
                    <option>Category</option>
                    {categories && categories.map((category, i) => {
                        return <option key={i} value={category._id}>{category.name}</option>
                    })}
                </select>
                <select className="bg-white w-1/3 border rounded-md p-2" onChange={e => handleInputChange(e, "account")}>
                    <option>Accounts</option>
                    {accounts && accounts.map((account, i) => {
                        return <option key={i} value={account._id}>{account.name}</option>
                    })}
                </select>
                <input 
                    className="text-sm w-1/3 mx-2 border rounded-md py-2"
                    type="date" 
                    name="date"
                    onChange={e => handleInputChange(e, "date")}
                    value={transaction.date}/>
            </div>  
            <div className="self-end mt-2">
                <button onClick={close} className="bg-gray-400 text-white font-medium px-3 py-2 mr-1 rounded-md text-sm">Cancel</button>
                <button onClick={saveTransaction} className="bg-green-500 text-white font-medium px-3 py-2 rounded-md text-sm">Add</button>
            </div>
        </div>
    );
};

export default TransactionForm;