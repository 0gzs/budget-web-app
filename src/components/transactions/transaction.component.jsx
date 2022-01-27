import React from 'react';
import dollarUS from '../../services/currency-formatter';
import dateFormatter from '../../services/date-formatter';
import TransactionService from './services/transaction.service';

const Transaction = ({ transaction, updateState }) => {    
    const amountColor = () => {
        if (transaction.type === 0) return "text-red-500";
        return "text-moneygreen"
    };

    const deleteOne = () => {
        TransactionService.delete(transaction._id)
            .then(() => updateState(transaction._id))
            .catch(err => console.log(err));
    };

    return (
        <div className='w-full py-2
                        rounded-md font-source
                        flex items-center bg-carbon
                        shadow-inner'>
            <i onClick={deleteOne}
                className="text-xl bi bi-square px-3 hover:cursor-pointer"></i>
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