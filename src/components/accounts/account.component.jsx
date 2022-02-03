import React from 'react';
import AccountLoader from './loader.component';
import dollarUS from '../../functions/currency-formatter';
import Emoji from '../emoji.component';

const Account = ({ account, deleteOne }) => {

    if (!account) return <AccountLoader />

    const ExitBtn = () => {
        return (
            <div onClick={() => deleteOne(account)}
                className='w-6 h-6 bg-gray-600 rounded-md 
                            absolute right-[-10px] top-[-10px]
                            flex items-center justify-center text-sm pt-[3px] hover:cursor-pointer 
                            min-w-max scale-0 transition-all
                            duration-100 origin-right group-hover:scale-100'>
                <Emoji symbol="❌" label="letter x" />
            </div>
        );
    };
    
    return (
        <div className='w-full font-source bg-dark flex px-3 py-2 items-center justify-around relative group'>
            <ExitBtn />
            <i className='bi bi-bank text-white text-sm'></i>
            <p className='text-white text-md capitalize font-big w-2/3 ml-2'>{account.name}</p>
            <div className='min-w-[94px] flex justify-end'>
                <p className='w-fit bg-carbon px-2 py-1 rounded-md text-moneygreen text-sm font-big'>{dollarUS.format(account.balance)}</p>
            </div>
        </div>
    );
};

export default Account;