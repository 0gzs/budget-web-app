import React, { useState } from 'react';
import dollarUS from '../../functions/currency-formatter';
import { createAccount, deleteAccount, pushTransaction } from '../../services/AccountService';
import { createTransaction, deleteTransaction } from '../../services/TransactionService';
import Account from './account.component';
import AccountForm from './form/form.component';
import AccountLoader from './loader.component';

const Accounts = ({ accounts, balance, handleState, handleTransactions }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);

    const showForm = () => setShow(true);
    const hideForm = () => setShow(false);

    const saveAccount = async account => {
        hideForm();
        setIsLoading(true);
        const transaction = {
            description: `Deposit to ${account.name}`,
            date: new Date(),
            amount: parseFloat(account.balance),
            type: 1,
            category: "Income",
            account: null
        }
        let accounts = await createAccount(account);
        
        let savedAccount = accounts[accounts.length - 1];
        transaction.account = savedAccount._id;
        
        const transactions = await createTransaction(transaction)
        handleTransactions(transactions);
        
        let savedTransaction = transactions[transactions.length - 1];
        accounts = await pushTransaction(savedAccount._id, savedTransaction._id);
        handleState(accounts);

        setIsLoading(false);
    };

    const deleteOne = async account => {
        setIsLoading(true);

        let transactions = [...account.transactions];
        const updatedState = await deleteAccount(account._id, handleState);
        handleState(updatedState);

        if (transactions.length > 0) {
            transactions.forEach(async id => {
                transactions = await deleteTransaction(id);
                handleTransactions(transactions)
            });
        }
        handleTransactions(transactions);

        setIsLoading(false);
    };

    return (
        <div className='card'>
            {show && 
                <AccountForm    
                    hideForm={hideForm}
                    submit={saveAccount} />

            }
            <h1 className='card-title'>Accounts </h1>  
            <div className='w-full flex p-3 space-y-1 overflow-x-auto
                          bg-carbonlight rounded-lg flex-col max-h-32'>
                
                { isLoading && <AccountLoader /> }
                { !isLoading && accounts ?
                    accounts.map((account, i) => {
                        return <Account key={i} 
                            account={account} 
                            deleteOne={deleteOne} />
                    }) : null
                }

            </div>   
            <p className='text-xs font-huge 
                          tracking-widest uppercase
                          text-center text-yellow'>
                Accounts total: 
                <span className='text-moneygreen font-block font ml-2'>{ balance && dollarUS.format(balance)}</span>
            </p>  
                    
            <button className='card-btn' onClick={showForm}>
                <i className='bi bi-plus card-icon'></i>
                Add an account
            </button>
        </div>
    );
};

export default Accounts;