import React from 'react';
import dollarUS from '../../services/currency-formatter';

const Transactions = ({ transactions, handleTransactionsUpdate }) => {
    return (
        <div>
            <div className="flex flex-wrap justify-between items-center">
                <h1 className="text-left text-xl font-light text-gray-700">Transactions</h1>
                <button
                    className="bg-violet-600 py-2 px-3 rounded text-white font-bold hover:bg-violet-700 rounded-md"
                    onClick={() => {}}>
                        New transactions
                </button>
            </div>
            <div className="flex overflow-x-auto space-x-3 my-2 py-2 pl-2 pr-4 no-scrollbar">
                {transactions && transactions.map((transaction, i) => {
                    return (
                        <div key={i} 
                            className="w-full py-[2rem] bg-slate-100">
                            <p>{transaction.description}</p>
                            <p>{transaction.category}</p>
                            <p>{dollarUS.format(transaction.amount)}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Transactions;