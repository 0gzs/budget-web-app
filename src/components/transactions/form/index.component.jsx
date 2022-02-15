import React, { useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import useForm from '../../../hooks/useForm.hook';
import { addAccountTransaction, pushTransaction } from '../../../services/AccountService';
import { addCategoryTransaction } from '../../../services/CategoryService';
import { createTransaction } from '../../../services/TransactionService';
import TypeButton from './type-btn.component';

const TransactionForm = ({ handleState, hide, loading, handleAccounts, handleCategories }) => {
    let categories = JSON.parse(localStorage.getItem("categories"));
    let accounts = JSON.parse(localStorage.getItem("accounts"));
    
    let typeClasses = useMemo(() => {
        return { red: "bg-red-500", green: "bg-moneygreen justify-end" }
    }, []);

    const [typeColor, setTypeColor] = useState(typeClasses.red);
    const initialState = {
        description: "",
        date: "",
        amount: "",
        type: 0,
        category: "",
        account: "",

    }
    const validations = [
        ({description}) => isRequired(description) || { description: "Give this transaction a description." },
        ({amount}) => isANumber(amount) || { amount: "Enter a numeric amount" },
        ({category}) => isRequired(category) || { category: "Choose a category."},
        ({account}) => isRequired(account) || { account: "Choose an account."}
    ]
    const { values, changeHandler, errors, touched, submitHandler } = useForm(initialState, validations, submit);

    function isRequired(value) {
        return value !== null && value.trim().length > 0;
    }

    function isANumber(value) {
        const parsed = parseInt(value);

        return !isNaN(parsed) && !parsed !== null;
    }
    
    function handleType(e) {
        changeHandler(e, "type", !values.type)
        setTypeColor(typeColor === typeClasses.red ? typeClasses.green : typeClasses.red);
    }

    async function submit(transaction) {
        hide();
        loading(true);

        const selectedAccount = accounts.filter(account => account._id === transaction.account)[0];

        if (accounts.length <= 0 || categories.length <= 0) {
            loading(false);
            return hide;
        };

        if (selectedAccount.balance < transaction.amount) {
            loading(false);
            toast("❗️😰 Oops! Looks like that account might be a bit short.");
            return hide;
        };
        
        const transactionData = {
            description: transaction.description,
            date: transaction.date,
            amount: transaction.amount,
            type: transaction.type,
            category: transaction.category,
            account: transaction.account
        }

        const transactions = await createTransaction(transactionData);
        
        handleState(transactions);
        
        const savedTransaction = transactions[transactions.length - 1];
        
        accounts = await addAccountTransaction(savedTransaction);
        const savedAccount = accounts[accounts.length - 1];

        accounts = await pushTransaction(savedAccount._id, savedTransaction._id);
        handleAccounts(accounts);

        categories = await addCategoryTransaction(savedTransaction);
        handleCategories(categories);

        loading(false)
    }

    return (
        <div className='modal'>
            <div className='form-container'>
                <h1 className='form-title'>add transaction</h1>
                <div className='form'>
                    <div className='w-full flex space-x-2 items-center'>
                        <div className='w-full'>
                            <label className='form-label'>description</label>
                            <input 
                                type="text"
                                name="description"
                                placeholder='description'
                                value={values.description}
                                onChange={changeHandler}
                                className={`form-input focus:outline-none focus:border-4 focus:border-cyan-300 w-full`} />
                            <div>
                                {(touched.description && errors.description) || touched.empty ? 
                                    <p className='error'>{errors.description}</p> :
                                    <p className='error opacity-0'>none</p>}
                            </div>
                        </div>
                        <div className='w-[80px] flex flex-col'>
                            <label className='form-label'>type</label>
                            <TypeButton typeColor={typeColor} handle={handleType} />
                        </div>
                    </div>
                    <div className='w-full flex space-x-3 items-center'>
                        <div className='form-group w-2/3'>
                            <label className='form-label'>date:</label>
                            <input 
                                type="date" 
                                name="date"
                                value={values.date}
                                onChange={changeHandler}
                                className='form-input focus:outline-none focus:border-4 focus:border-cyan-300 w-full' />
                            <div>
                                {(touched.date && errors.date) || touched.empty ? 
                                    <p className='error'>{errors.date}</p> :
                                    <p className='error opacity-0'>none</p>}
                            </div>
                        </div>
                        <div className='form-group w-2/3'>
                            <label className='form-label'>Amount</label>
                            <input 
                                type="text"
                                name="amount"
                                className='form-input focus:outline-none focus:border-4 focus:border-cyan-300 w-full'
                                placeholder={`$0.00`}
                                value={values.amount}
                                onChange={changeHandler} />
                            <div>
                                {(touched.amount && errors.amount) || touched.empty ? 
                                    <p className='error'>{errors.amount}</p> :
                                    <p className='error opacity-0'>none</p>}
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex space-x-3'>
                        <div className='form-group w-1/2'>
                            <label className='form-label'>Category</label>
                            <select 
                                value={values.category}
                                name="category"
                                onChange={changeHandler}
                                className='form-input focus:outline-none focus:border-4 focus:border-cyan-300' >
                                <option value={null} onChange={changeHandler}>-Category</option>
                                {categories && categories.map((category, i) => {
                                    return <option key={i} 
                                                className=' font-medium font-sans capitalize' 
                                                value={category._id}
                                                onChange={changeHandler}> {category.name} </option>
                                })}
                            </select>
                            <div>
                                {(touched.category && errors.category) || touched.empty ? 
                                    <p className='error'>{errors.category}</p> :
                                    <p className='error opacity-0'>none</p>}
                            </div>
                        </div>
                        <div className='form-group w-1/2'>
                            <label className='form-label'>Account</label> 
                            <select 
                                placeholder='Account'
                                value={values.account}
                                name="account"
                                onChange={changeHandler}
                                className='form-input focus:outline-none focus:border-4 focus:border-cyan-300 w-full' >
                                <option value={null}>-Account-</option>
                                {accounts && accounts.map((account, i) => {
                                    return <option key={i} 
                                                className=' font-medium font-sans capitalize' 
                                                value={account._id}
                                                onChange={changeHandler}> {account.name} </option>
                                })}
                            </select>
                            <div>
                                {(touched.account && errors.account) || touched.empty ? 
                                    <p className='error'>{errors.account}</p> :
                                    <p className='error opacity-0'>none</p>}
                            </div>
                        </div>  
                    </div>
                </div>
                <div className='form-btn-group'>
                    <button onClick={hide}
                        className='form-btn btn-cancel'>cancel</button>

                    <button onClick={submitHandler}
                        className='form-btn btn-submit'>submit</button>
                </div>
            </div>
        </div>
    );
};

export default TransactionForm;