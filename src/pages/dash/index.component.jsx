import React from 'react';
import useAccounts from '../../hooks/useAccounts.hook';
import useCategories from '../../hooks/useCategories.hook';
import useTransactions from '../../hooks/useTransactions.hook';

import Header from '../../components/header/index.component';
import Accounts from '../../components/accounts/index.component';
import Categories from '../../components/categories/index.component'
import Transactions from '../../components/transactions/index.component';

const Dash = () => {
    const { accounts, balance, handleAccounts } = useAccounts();
    const { categories, handleCategories } = useCategories();
    const { transactions, handleTransactions } = useTransactions();

    return (
        <div className='w-full flex flex-col items-center
                        md:flex-row justify-center 
                        bg-dark space-y-3 md:space-y-0 
                        md:space-x-3 shadow-inner py-24 relative'>            
           <Header />
            <div className='flex flex-col justify-items-start h-full
                            space-y-3 w-fit sm:max-h-[680px]'>
                <Accounts 
                    accounts={accounts}
                    balance={balance}
                    handleState={handleAccounts}
                    handleTransactions={handleTransactions} /> 
                <Categories 
                    categories={categories} 
                    balance={balance}
                    handleState={handleCategories} />
            </div>
           <div className='w-fit h-[680px]'>
                <Transactions 
                    transactions={transactions}
                    handleState={handleTransactions}
                    handleCategories={handleCategories}
                    handleAccounts={handleAccounts} />
           </div>
        </div>
    );
};

export default Dash;