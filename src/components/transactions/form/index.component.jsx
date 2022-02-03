import React, { useState, useMemo } from 'react';
import useForm from '../../../hooks/useForm.hook';
import TypeButton from './type-btn.component';

const TransactionForm = ({ hideForm, submit }) => {
    const categories = JSON.parse(localStorage.getItem("categories"));
    const accounts = JSON.parse(localStorage.getItem("accounts"));
    
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
        account: ""

    }
    const validations = [
        ({description}) => isRequired(description) || { description: "Give this transaction a description." },
        ({date}) => isDate(date) || { date: "Choose a valid date." },
        ({amount}) => isANumber(amount) || { amount: "Enter a numeric amount" },
        ({category}) => isRequired(category) || { category: "Choose a category."},
        ({account}) => isRequired(account) || { account: "Choose an account."}
    ]
    const { values, changeHandler, errors, touched, submitHandler } = useForm(initialState, validations, submit);

    function isRequired(value) {
        return value !== null && value.trim().length > 0;
    }

    function isANumber(value) {
        return !isNaN(value) && !value !== null && value.trim().length > 0;
    }

    function isDate(value) {
        return typeof value === typeof Date;
    }
    
    function handleType(e) {
        changeHandler(e, "type", !values.type)
        setTypeColor(typeColor === typeClasses.red ? typeClasses.green : typeClasses.red);
    }

    return (
        <div className='modal'>
            <div className='form'>
                <h1 className='form-title mb-3'>Add a transaction</h1>
                <div className='w-full flex space-x-2'>
                    <div className='form-group w-2/3'>
                        <label className='form-label'>Description</label>
                        <input 
                            type="text"
                            name="description"
                            placeholder='description'
                            value={values.description}
                            onChange={changeHandler}
                            className={`form-input w-full`} />
                        <div className='my-1 w-full'>
                            {(touched.description && errors.description) || touched.empty ? 
                                <p className='error'>{errors.description}</p> :
                                <p className='error opacity-0'>none</p>}
                        </div>
                    </div>
                    <div className='form-group w-[80px]'>
                        <label className='form-label'>Type</label>
                        <TypeButton typeColor={typeColor} handle={handleType} />
                        <div className='my-1 w-full h-4/5'>
                        </div>
                    </div>
                </div>
                <div className='w-full flex space-x-3 items-center'>
                    <div className='form-group w-2/3'>
                        <label className='form-label'>Date</label>
                        <input 
                            type="date" 
                            value={values.date}
                            name="date"
                            onChange={changeHandler}
                            className='form-input w-full' />
                        <div className='my-1 w-full '>
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
                            className='form-input w-full'
                            placeholder={`$0.00`}
                            value={values.amount}
                            onChange={changeHandler} />
                        <div className='my-1 w-full '>
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
                            className='form-input' >
                            <option value={null} onChange={changeHandler}>-Category</option>
                            {categories && categories.map((category, i) => {
                                return <option key={i} 
                                            className=' font-medium font-sans capitalize' 
                                            value={category._id}
                                            onChange={changeHandler}> {category.name} </option>
                            })}
                        </select>
                        <div className='my-1 w-full'>
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
                            className='form-input w-full' >
                            <option value={null}>-Account-</option>
                            {accounts && accounts.map((account, i) => {
                                return <option key={i} 
                                            className=' font-medium font-sans capitalize' 
                                            value={account._id}
                                            onChange={changeHandler}> {account.name} </option>
                            })}
                        </select>
                        <div className='my-1 w-full'>
                            {(touched.account && errors.account) || touched.empty ? 
                                <p className='error'>{errors.account}</p> :
                                <p className='error opacity-0'>none</p>}
                        </div>
                    </div>  
                </div>
                <div className='form-btn-group'>
                    <button onClick={hideForm}
                        className='form-btn btn-cancel'>Nvm.</button>

                    <button onClick={submitHandler}
                        className='form-btn btn-submit'>Take my 💴</button>
                </div>
            </div>
        </div>
    );
};

export default TransactionForm;