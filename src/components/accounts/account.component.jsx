import React from 'react';
import dollarUS from '../../services/currency-formatter';
import AccountService from './services/account.service';
import Emoji from '../emoji.component';

const Account = ({ account, remove }) => {
    const deleteOne = async () => {
        await AccountService.delete(account.id)
            .then(() => remove(account.id))
            .catch(err => console.log(err));
    };

    const ExitBtn = () => {
        return (
            <div className='w-6 h-6 bg-gray-600 rounded-md 
                            absolute right-[-10px] top-[-10px]
                            flex items-center justify-center text-sm pt-[3px]'>
                <Emoji symbol="❌" label="letter x" />
            </div>
        );
    };
    return (
        <div className='w-full bg-dark flex px-3 py-2 items-center justify-around relative'>
            <ExitBtn />
            <i className='bi bi-bank text-white text-lg'></i>
            <p className='text-white text-lg font-big w-2/3 ml-2'>{account.name}</p>
            <div className='bg-carbon px-2 py-1 rounded-md'>
                <p className='text-moneygreen text-md font-big'>{dollarUS.format(account.balance)}</p>
            </div>
        </div>
    );
};

export default Account;