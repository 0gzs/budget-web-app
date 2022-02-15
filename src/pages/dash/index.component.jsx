import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/AuthService';

import useAccounts from '../../hooks/useAccounts.hook';
import useCategories from '../../hooks/useCategories.hook';
import useTransactions from '../../hooks/useTransactions.hook';

import Accounts from '../../components/accounts/index.component';
import Categories from '../../components/categories/index.component'
import Transactions from '../../components/transactions/index.component';

const Dash = () => {
    const navigate = useNavigate();
    
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    useEffect(() => {
        if (!user) {
            navigate('/login');
        };
    }, [user, navigate]);

    const signOut = () => {
        logout();
        setUser(null);
    };

    const { accounts, totalBalance, handleAccounts } = useAccounts();
    const { categories, handleCategories } = useCategories();
    const { transactions, handleTransactions } = useTransactions();

    if (!user) return <h1>Loading...</h1>

    return (
        <div className='w-full flex space-x-2 items-start justify-center bg-dark/95 pt-20'>
            <div className='flex flex-col justify-items-start h-full
                            space-y-3 w-fit sm:max-h-[680px] z-10'>
                <Accounts 
                    accounts={accounts} 
                    handleState={handleAccounts} 
                    totalBalance={totalBalance} 
                    handleTransactions={handleTransactions} />
                <Categories
                    categories={categories}
                    handleState={handleCategories}
                    balance={totalBalance} />
            </div>
            <div className='w-fit h-[680px]'>
                <Transactions
                    transactions={transactions}
                    handleState={handleTransactions}
                    handleAccounts={handleAccounts}
                    handleCategories={handleCategories} />       
            </div>
        </div>
    );
};

export default Dash;