import React, { useState } from 'react';
import dollarUS from '../../functions/currency-formatter';


import AccountLoader from './loader.component';
import ViewAccount from './view-account/viewAccount.component';

const Account = ({ account }) => {
    const [viewAccount, setViewAccount] = useState(false);

    const show = () => setViewAccount(true);
    const hide = () => setViewAccount(false);

    if (!account) return <AccountLoader />

    if (viewAccount) {
        return <ViewAccount account={account} hide={hide} show={show} />;
    }

    return (
        <div className='w-full font-source bg-dark flex px-3 py-2 items-center justify-around relative group rounded hover:cursor-pointer'
            onClick={show}>
                <i className='bi bi-bank text-white text-sm'></i>
                <p className='text-white text-xs capitalize font-big w-2/3 ml-2'>{account.name}</p>
                <div className='min-w-[94px] flex justify-end'>
                    <p className='w-fit bg-carbon px-2 py-1 rounded-md text-moneygreen text-xs font-big'>{dollarUS.format(account.balance)}</p>
                </div>
        </div>
    );
};

export default Account;