import React from 'react';
import useAccounts from '../../hooks/useAccounts.hook';
import useCategories from '../../hooks/useCategories.hook';
import useTransactions from '../../hooks/useTransactions.hook';

import Accounts from '../../components/accounts/index.component';
import Categories from '../../components/categories/index.component'
import Transactions from '../../components/transactions/index.component';

const Dash = () => {
    const { accounts, handleAccounts } = useAccounts();
    const { categories, handleCategories } = useCategories();
    const { transactions, handleTransactions } = useTransactions();

    return (
        <div className='w-full flex flex-col
                        md:flex-row items-center justify-center 
                        bg-dark py-4 space-y-3 sm:space-y-0 
                        space-x-3 relative'>
            <div className='flex flex-col
                            space-y-3 w-fit'>
                <Accounts accounts={accounts} updateState={handleAccounts} />
                <Categories categories={categories} updateState={handleCategories} />
            </div>
           <div className='w-fit h-[680px]'>
            <Transactions 
                    transactions={transactions}
                    updateState={handleTransactions}
                    updateCategory={handleCategories}
                    updateAccount={handleAccounts} />
           </div>
        </div>
    );
};

export default Dash;