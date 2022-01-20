import React, { useEffect, useState } from "react";
import CategoryService from "../services/category.service";
import TransactionService from "../../services/transactions.service";
import dollarUS from "../services/currency-formatter";
import dateFormatter from '../services/date-formatter';
import AddTransaction from "../domain/transaction/add-transaction.component";

const Transactions = () => {
    const [transactions, setTransactions] = useState(() => {
        const storage = localStorage.getItem("transactions");
        const parsed = JSON.parse(storage);

        return parsed || null;
    });
    const [categories, setCategories] = useState(() => {
        const storage = localStorage.getItem("categories");
        const parsed = JSON.parse(storage);

        return parsed || null;
    });
    const [addNew, setAddNew] = useState(false);

    useEffect(() => {
        if (!transactions) getAll();
    }, [transactions]);

    useEffect(() => {
        if (!categories) getAllCategories();
    }, [categories]);

    const getAll = () => {
        TransactionService.getAll()
            .then(res => {
                setTransactions([...res.data]);
                localStorage.setItem("transactions", JSON.stringify(res.data));
            })
            .catch(err => console.log(err));
    };

    const getAllCategories = () => {
        CategoryService.getAll()
            .then(res => {
                setCategories([...res.data]);
                localStorage.setItem("categories", JSON.stringify(res.data));
            });
    };

    const deleteOne = id => {
        TransactionService.delete(id)
            .then(() => setTransactions([...transactions.filter(transaction => transaction._id !== id)]))
            .catch(err => console.log(err));
    };  

    const handleShowAddNew = () => setAddNew(!addNew);

    const handleAddTransaction = transaction => {
        const transactionsState = [...transactions];
        transactionsState.push(transaction);
        setTransactions([...transactionsState]);
    }

    return (
        <div className="mt-3 flex flex-col border p-4">
            <div className="w-full flex items-center justify-between pr-4">
                <h5 className="text-left text-xl font-light text-gray-700">Transactions</h5>
                <button onClick={handleShowAddNew} className="px-3 py-2 bg-violet-600 hover:bg-violet-700 font-medium text-sm text-white rounded-md">New Transaction</button>
            </div>
            { addNew && <AddTransaction close={handleShowAddNew} handleAddTransaction={handleAddTransaction} />}

            <div className="flex flex-column flex-1 space-y-4 mt-2 py-3 px-2 max-h-[90%]">
                {(categories && transactions) && transactions.map((transaction, i) => {
                    const category = categories.filter(category => category._id === transaction.category)[0];
                    const amountColor = () => {
                        if (transaction.type === 0) return "text-red-600";
                        return "text-green-500";
                    }
                    return (
                        <div key={i} className="flex items-center px-4 ">
                            <div className="w-full h-[5rem] border rounded-xl shadow-md px-4 mb-2 flex items-center flex-shrink-0">
                                <i className={`${category.icon} text-[28px] mx-4`} style={{ color: category.color }}></i>
                                <div className="basis-4/5">
                                    <p className="text-[18px]">{transaction.description}</p>
                                    <p className="text-gray-400 font-bold hover:text-gray-500">{dateFormatter(transaction.date)}</p>
                                </div>
                                <p className={`${amountColor()}`}>{transaction.type === 0 && "-"}{dollarUS.format(transaction.amount)}</p> 
                            </div>
                            <button className="ml-4" onClick={() => deleteOne(transaction._id)}><i className="bi bi-trash text-red-600"></i></button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Transactions;