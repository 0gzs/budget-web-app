import React from 'react';
import dollarUS from '../../services/currency-formatter';
import dateFormatter from '../../services/date-formatter';
import TransactionRequest from './services/transaction-request.service';

const Transaction = ({ transaction, updateState, handleAccounts, handleCategories }) => {    
    let categories = JSON.parse(localStorage.getItem("categories"));

    const categoryColor = () => {
        if (!categories) return null;
        let category = categories.filter(c => c._id === transaction.category)[0];
        if (category) return category.color;

        return "border-2 border-moneygreen"
    };

    const amountColor = () => {
        if (transaction.type === 0) return "text-red-500";
        return "text-moneygreen"
    };

    return (
        <div className='w-full py-2
                        rounded-md font-source
                        flex items-center bg-carbon
                        shadow-inner'>
            <div onClick={() => TransactionRequest.deleteTransaction(transaction, updateState, handleAccounts, handleCategories)}
                className={`text-xl p-2.5 mx-3 rounded-sm 
                            hover:cursor-pointer ${categoryColor()}`}>
                
            </div>
            <div className='text-left flex-1'>
                <p className='text-md  font-big uppercase'>{transaction.description}</p>
                <p className='text-md text-cyan-400 font-big'>{dateFormatter(transaction.date)}</p>
            </div>
            <div className='px-2 py-1 rounded-md w-fit bg-carbonlight justify-self-end
                            mr-4 text-center'>
                <p className={`${amountColor()} font-huge`}>{dollarUS.format(transaction.amount)}</p>
            </div>
        </div>
    );
};

export default Transaction;