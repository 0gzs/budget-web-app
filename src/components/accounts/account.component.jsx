import React from 'react';
import dollarUS from '../../services/currency-formatter';
import Emoji from '../emoji.component';
import AccountRequest from './services/account-request.service';

const Account = ({ account, updateState }) => {
 

    const ExitBtn = () => {
        return (
            <div onClick={() => AccountRequest.deleteOne(account._id, updateState)}
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
        <div className='w-full bg-dark flex px-3 py-2 items-center justify-around relative group'>
            <ExitBtn />
            <i className='bi bi-bank text-white text-lg'></i>
            <p className='text-white text-lg font-big w-2/3 ml-2'>{account.name}</p>
            <div className='min-w-[94px] flex justify-end'>
                <p className='w-fit bg-carbon px-2 py-1 rounded-md text-moneygreen text-md font-big'>{dollarUS.format(account.balance)}</p>
            </div>
        </div>
    );
};

export default Account;