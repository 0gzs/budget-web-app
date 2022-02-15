import React, { useState } from 'react';
import dollarUS from '../../functions/currency-formatter';
import Account from './account.component';
import AccountForm from './form/form.component';
import AccountLoader from './loader.component';

const Accounts = ({ accounts, handleState, totalBalance, handleTransactions }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);

    const showForm = () => setShow(true);
    const hideForm = () => setShow(false);

    return (
        <div className='card'>
            <h1 className='card-title'>accounts</h1>
            <div className='bg-carbonlight w-full p-2 flex flex-col space-y-1 overflow-y-auto no-scrollbar max-h-16'>
                { isLoading && <AccountLoader /> }
                { !isLoading && accounts ? 
                    accounts.map((account, i) => {
                        return <Account key={i} account={account} />;
                }): null}
            </div>
            <p className='card-more'>
                Accounts total: 
                <span className='text-moneygreen ml-2'>{dollarUS.format(totalBalance)}</span>
            </p>
            <button className='card-btn' onClick={showForm}>
                <i className='bi bi-plus card-icon'></i>
                new account
            </button>

            {show && 
                <AccountForm 
                    handleState={handleState}
                    hide={hideForm}
                    loading={setIsLoading}
                    handleTransactions={handleTransactions} />}
        </div>
    );
};

export default Accounts;