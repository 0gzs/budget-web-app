import React from 'react';
import useForm from '../../../hooks/useForm.hook';

const AccountForm = ({ hideForm, submit }) => {
    const initialState = {
        name: "",
        balance: "",
        type: "",
        user: localStorage.getItem("userId")
    };
    const validations = [
        ({ name }) => isRequired(name) || { name: 'An account name is required' },
        ({ balance }) => isANumber(balance) || { balance: 'Choose a numeric amount' },
        ({ type }) => isRequired(type) || { type: 'Savings or checking?' },
    ]
    const { values, changeHandler, errors, touched, submitHandler } = useForm(initialState, validations, submit);

    function isRequired(value) {
        return value !== null && value.trim().length > 0;
    }

    function isANumber(value) {
        return !isNaN(value) && !value !== null && value.trim().length > 0;
    }

    return (
        <div className='modal'>
            <div className='form'>
                <h1 className='form-title mb-2'>Add an account</h1>
                <div className='form-group w-full'>
                    <label className='form-label'>Account name</label>
                    <input 
                        type="text"
                        name="name"
                        value={values.name}
                        placeholder="ex. '🐷 Bank'" 
                        className='form-input'
                        onChange={changeHandler} />
                    <div className='my-1 w-full'>
                        {(touched.name && errors.name) || touched.empty ? 
                            <p className='error'>{errors.name}</p> :
                            <p className='error opacity-0'>none</p>}
                    </div>
                </div>

                <div className='flex space-x-4 items-center w-full'>
                    <div className='form-group w-1/2'>
                        <label className='form-label'>Starting Balance</label>
                        <input
                            type="text"
                            name="balance"
                            className='form-input'
                            placeholder={`$0.00`}
                            value={values.balance}
                            onChange={changeHandler} />
                        <div className='my-1 w-full'>
                            {(touched.balance && errors.balance) || touched.empty ? 
                                <p className='error'>{errors.balance}</p> :
                                <p className='error opacity-0'>none</p>}
                        </div>
                    </div>

                    <div className='form-group w-1/2'>
                        <label className='form-label'>Account type</label>
                        <select 
                            className='form-input' 
                            name="type"
                            value={values.type}
                            placeholder='-Type-'
                            onChange={changeHandler} >
                            <option value={null}></option>
                            <option className='font-medium font-sans' 
                                value={0}
                                onChange={changeHandler}> Checking </option>
                            <option className='font-medium font-sans' 
                                value={1}
                                onChange={changeHandler}> Savings </option>
                        </select>
                        <div className='my-1 w-full'>
                            {(touched.type && errors.type) || touched.empty ? 
                                <p className='error'>{errors.type}</p> :
                                <p className='error opacity-0'>none</p>}
                        </div>
                    </div>

                </div>
                <div className='form-btn-group'>
                    <button onClick={hideForm}
                        className='form-btn btn-cancel'>Nvm.</button>

                    <button onClick={submitHandler}
                        className='form-btn btn-submit'>Submit 👍</button>
                </div>
            </div>
        </div>
    );
};

export default AccountForm;