import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import dollarUS from '../../functions/currency-formatter';

import { createAccount, getAccounts, pushTransaction, reset } from '../../features/accounts/accountsSlice';
import { createTransaction } from '../../features/transactions/transactionsSlice';

import Account from './account.component';
import AccountForm from './form/form.component';
import AccountLoader from './loader.component';

const Accounts = () => {
    const [show, setShow] = useState(false);
    const [totalBalance, setTotalBalance] = useState(0);

    const showForm = () => setShow(true);
    const hideForm = () => setShow(false);

    const { accounts, isLoading, isError, message } = useSelector(state => state.accounts);

    const dispatch = useDispatch()

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        dispatch(getAccounts());

        return () => {
            dispatch(reset())
        }
    }, [isError, dispatch, message])

    useEffect(() => {
        if (accounts) calculateBalance();

        async function calculateBalance() {
            let totalBal = 0;
            accounts.forEach(account => totalBal += account.balance);
            setTotalBalance(totalBal);
        }
    }, [accounts]);

    const submit = async account => {
        const { name, balance, type } = account;

        if (!name || !balance || !type) {
            toast('Hmm. Some fields seem to be missing');
            return showForm();
        } 

        hideForm();
        
        const accountData = {
            name,
            balance,
            type
        }
        
        const response = await dispatch(createAccount(accountData));
        const savedAccount = response.payload;
        
       const transactionResponse = await dispatch(createTransaction({
            description: `Deposit to ${savedAccount.name}`,
            date: new Date(),
            amount: savedAccount.balance,
            type: 1,
            category: "Income",
            account: savedAccount._id
        }));
        const savedTransaction = transactionResponse.payload;

        const data = {
            id: savedAccount._id,
            transactionId: savedTransaction._id
        }

        dispatch(pushTransaction(data));
    };

    return (
        <div className='card'>
            <h1 className='card-title'>accounts</h1>
            <div className='bg-carbonlight w-full h-[700px] p-2 flex flex-col space-y-1 overflow-y-auto no-scrollbar'>
                { accounts && accounts.length > 0 ? (

                    accounts.map((account, i) => {
                        if (isLoading) return <AccountLoader key={i} />
                        return <Account key={i} account={account} />;
                    })) : 

                    <p className='italic text-gray-400 text-center font-mono'>No accounts yet</p>
                }
            </div>
            
            <button className='card-btn' onClick={showForm}>
                <i className='bi bi-plus card-icon'></i>
                new account
            </button>

            <p className='card-more'>
                Accounts total: 
                <span className='text-moneygreen ml-2'>{dollarUS.format(totalBalance)}</span>
            </p>

            {show && 
                <AccountForm 
                    hide={hideForm}
                    submit={submit} />}
        </div>
    );
};

export default Accounts;