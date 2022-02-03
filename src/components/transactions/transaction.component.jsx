import React from 'react';
import dollarUS from '../../functions/currency-formatter';
import dateFormatter from '../../functions/date-formatter';

const Transaction = ({ transaction, deleteOne }) => {    
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
            <div onClick={() => deleteOne(transaction)}
                className={`text-lg p-2.5 mx-3 rounded-sm 
                            hover:cursor-pointer ${categoryColor()}`}>
                
            </div>
            <div className='text-left flex-1'>
                <p className='text-sm  font-big capitalize'>{transaction.description}</p>
                <p className='text-sm text-cyan-400 font-big'>{dateFormatter(transaction.date)}</p>
            </div>
            <div className='px-2 text-sm py-1 rounded-md w-fit bg-carbonlight justify-self-end
                            mr-4 text-center'>
                <p className={`${amountColor()} font-huge`}>{dollarUS.format(transaction.amount)}</p>
            </div>
        </div>
    );
};

export default Transaction;