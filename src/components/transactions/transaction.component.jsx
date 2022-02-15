import React from 'react';
import dollarUS from '../../functions/currency-formatter';
import dateFormatter from '../../functions/date-formatter';
import { removeAccountTransaction } from '../../services/AccountService';
import { removeCategoryTransaction } from '../../services/CategoryService';
import { deleteTransaction } from '../../services/TransactionService';
import Emoji from '../emoji.component';

const Transaction = ({ transaction, hide, handleState, updating, loading, handleAccounts, handleCategories }) => {    
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

    const deleteOne = async () => {
        updating(transaction._id);
        loading(true);
        console.log(transaction._id)

        const transactions = await deleteTransaction(transaction._id);
        handleState(transactions);

        const accounts = await removeAccountTransaction(transaction);
        if (accounts) handleAccounts(accounts);

        if (categories && transaction.type !== 1) {
            const categories = await removeCategoryTransaction(transaction);
            handleCategories(categories);
        };


        loading(false);
    }

    return (
        <div className='w-full py-2
                        rounded-md font-source
                        flex items-center bg-dark
                        shadow-inner group relative'>
            <div onClick={deleteOne} 
                className='w-8 h-8 bg-black/20 rounded-md 
                    absolute right-1 top-1
                    flex items-center justify-center text-md pt-[3px] hover:cursor-pointer 
                    min-w-max scale-0 transition-all
                    duration-100 origin-right group-hover:scale-100'>
                <Emoji symbol="❌" label="letter x" />
            </div>
            <div className={`text-lg p-2.5 mx-3 rounded-sm 
                            hover:cursor-pointer ${categoryColor()}`}></div>
            <div className='text-left flex-1'>
                <p className='text-sm  font-big capitalize text-white'>{transaction.description}</p>
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