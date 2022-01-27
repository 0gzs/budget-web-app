import React from 'react';
import dollarUS from '../../services/currency-formatter';

const Accounts = ({ accounts }) => {

    const Account = ({ account }) => {
        return (
            <div className='w-full bg-dark flex px-3 py-2 items-center justify-around'>
                <i className='bi bi-bank text-white text-lg'></i>
                <p className='text-white text-lg font-big w-2/3 ml-2'>{account.name}</p>
                <div className='bg-carbon px-2 py-1 rounded-md'>
                    <p className='text-moneygreen text-md font-big'>{dollarUS.format(account.balance)}</p>
                </div>
            </div>
        );
    };

    return (
        <div className='card'>
            <h1 className='card-title'>Accounts </h1>   
            <div className='w-full flex p-3 space-y-5
                          bg-carbonlight rounded-lg'>
                {accounts && accounts.map((account, i) => {
                    return (
                        <Account key={i} account={account} />
                    );
                })}

            </div>            
            <button className='card-btn'>
                <i className='bi bi-plus card-icon'></i>
                Add an account
            </button>
        </div>
    );
};

export default Accounts;