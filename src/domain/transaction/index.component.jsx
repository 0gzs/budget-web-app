import React, { useEffect, useState } from 'react';
import dollarUS from '../../services/currency-formatter';
import dateFormatter from '../../services/date-formatter';

const Transactions = ({ transactions, handleForm }) => {
    const [height, setHeight] = useState();
    useEffect(() => {
        let h = document.getElementById("transactions").parentElement.scrollHeight;
        setHeight(`${h * 0.4784}px`);
    });

    return (
        <div className={`overflow-y-auto`} id="transactions" style={{ maxHeight: height }}>
            <div className="py-2 sticky bg-white top-0 left-0 right-0 flex flex-wrap justify-between items-center">
                <h1 className="text-left text-xl font-light text-gray-700">Transactions</h1>
                <button
                    className="bg-violet-600 py-2 px-3 rounded text-white font-bold hover:bg-violet-700 rounded-md"
                    onClick={() => handleForm("transaction")}>
                        New Transactions
                </button>
            </div>
            <div className="flex overflow-x-auto space-x-3 my-2 py-2 no-scrollbar">
                {transactions && transactions.map((transaction, i) => {
                    return (
                        <div key={i} 
                            className="w-full py-1 bg-slate-100">
                            <div className="flex justify-between text-lg">
                                <p>{transaction.description}</p>
                                <p className="font-medium">{dollarUS.format(transaction.amount)}</p>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600">
                                <p>{transaction.category}</p>
                                <p>{dateFormatter(transaction.date)}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Transactions;