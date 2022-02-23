import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { createTransaction, deleteTransaction, deleteTransactions, getTransactions } from '../../../features/transactions/transactionsSlice';
import { addAccountTransaction, deleteAccount, pushTransaction, removeAccountTransaction, reset, updateAccount } from '../../../features/accounts/accountsSlice';
import { addCategoryTransaction, removeCategoryTransaction } from '../../../features/categories/categoriesSlice';

import dollarUS from '../../../functions/currency-formatter';

import Transaction from '../../transactions/transaction.component';
import TransactionForm from '../../transactions/form/index.component';
import { toast } from 'react-toastify';

const ViewAccount = ({ account, hide, show }) => {
    const [viewTransactionForm, setViewTransactionForm] = useState(false);
    const [edit, setEdit] = useState(false);
    const [editting, setEditting] = useState("");
    const [accountData, setAccountData] = useState({
        name: account.name,
        balance: account.balance
    })

    const startEdit = () => setEdit(true);
    const stopEdit = () => setEdit(false);
    
    const dispatch = useDispatch();
    const { categories } = useSelector(state => state.categories);
    const { transactions } = useSelector(state => state.transactions);

    useEffect(() => {
        dispatch(getTransactions());
        return () => {
            dispatch(reset());
        }
    }, [dispatch])

    const update = () => {
        dispatch(updateAccount({
            id: account._id,
            data: accountData[[editting]],
            field: editting
        }))

        setEditting("");
        show();
        stopEdit();
    };

    const onChange = e => setAccountData(prevState => ({
        ...prevState,
        [e.target.name]: e.target.value
    }));    

    const submit = async transaction => {
        setViewTransactionForm(false);
        const { description, date, amount, type, category } = transaction;

        if (!description || !date || !amount || !category) {
            toast('Hmm. Some fields seem to be missing');
            return setViewTransactionForm(true);
        }

        if (parseFloat(amount).toString() === 'NaN') {
            toast('Please enter a number')
            return setViewTransactionForm(true);
        }

        if (categories.length <= 0) {
            toast('You need accounts and categories before you can add a transaction!');
            return setViewTransactionForm(false);
        };

        if (account.balance < transaction.amount) {
            toast("❗️😰 Oops! Looks like that account might be a bit short.");
            return setViewTransactionForm(true);
        };
        
        const transactionData = {
            description,
            date,
            amount,
            type,
            category,
            account: account._id
        }

        const response = await dispatch(createTransaction(transactionData));
        const savedTransaction = response.payload;
        
        await dispatch(addAccountTransaction(savedTransaction));
        
        await dispatch(pushTransaction({ id: account._id, transactionId: savedTransaction._id}));

        await dispatch(addCategoryTransaction(savedTransaction));
    }

    const deleteOneTransaction = async transaction => {
        dispatch(deleteTransaction(transaction._id));
        
        if (account) {
            dispatch(removeAccountTransaction(transaction));
        };
        
        if (categories && transaction.type !== 1) {
            dispatch(removeCategoryTransaction(transaction));
        }
    };

    const deleteOneAccount = async () => {
        await dispatch(deleteAccount(account._id))
        
        await dispatch(deleteTransactions(account._id));
        hide();
    }

    return (
        <div className='modal'>
            <div className='w-[400px] min-h-[350px] max-h-[600px] bg-carbon px-4 pt-4 relative flex flex-col'>

                {edit && editting === 'name' ? (
                    <div className='flex justify-between'>
                        <input 
                            name="name"
                            className='w-2/3 text-cyan-400 font-extrabold flex-2 text-4xl text-left bg-transparent focus:outline-none'
                            type="text"
                            placeholder={accountData.name}
                            value={accountData.name || ""}
                            onChange={onChange} />
                    </div>
                ) :
                    <h1 className='text-cyan-400 font-extrabold text-4xl text-left' onClick={() => {
                        startEdit(true)
                        setEditting("name")
                    }}>{account.name}</h1>
                }

                
                <div className='flex'>
                    <p className='text-yellow font-bold flex w-1/2'>Current Balance: </p>
                        {edit && editting === "balance" ? (
                            <input 
                            name="balance"
                            className=' mb-1 bg-black/10 w-1/2 font-bold text-moneygreen focus:outline-none'
                            type="text"
                            placeholder={accountData.balance}
                            value={accountData.balance || ""}
                            onChange={onChange} />
                        ):
                            <span onClick={() => {
                                startEdit(true);
                                setEditting("balance")
                            }} className='text-moneygreen font-bold font-source'>{dollarUS.format(account.balance)}</span>
                        }
                </div>

                {editting ? (
                    <button className='absolute top-2 right-4 card-btn h-fit w-fit text-white text-xl' onClick={update} >
                        save
                    </button>
                ): null}
                
                <div className='min-h-[200px]  p-2 bg-carbonlight flex flex-col overflow-y-auto space-y-2 no-scrollbar'>
                    {transactions && transactions.map((transaction, i) => {
                        if (transaction.account === account._id) return <Transaction key={i} transaction={transaction} deleteOne={deleteOneTransaction} />
                        return null;
                    })}
                </div>

                <i className='bi bi-trash absolute top-3 right-4 w-fit text-white px-1 bg-red-700/60 border-2 
                            border-white/10 italic font-huge font-source hover:cursor-pointer'
                    onClick={deleteOneAccount}></i>

                <div className='flex space-x-6 justify-around z-10'>
                    <button className='card-btn' onClick={() => setViewTransactionForm(true)}>
                        new transaction
                    </button>
                    <button onClick={hide} className='card-btn card-btn-close'>
                        close
                    </button>
                </div>

                

                {viewTransactionForm && (
                    <TransactionForm 
                        hide={() => setViewTransactionForm(false)}
                        submit={submit} />
                )}
            </div>
        </div>
    );
}

export default ViewAccount;