import React, { useState } from 'react';

const AccountForm = ({ hide, submit }) => {
    const [account, setAccount] = useState({
        name: "",
        balance: "",
        type: ""
    });

    const onChange = e => setAccount(prevState => ({
        ...prevState,
        [e.target.name]: e.target.value
    }))

    return (
        <div className='modal'>
            <div className='form-container pb-0'>
                <h1 className='form-title'>add account</h1>
                <div className='form'>
                    <div className='w-full'>
                        <label className="form-label">account name:</label>
                        <input 
                            className="form-input focus:outline focus:outline-3 focus:outline-cyan-200"
                            type="text"
                            name="name"
                            placeholder='ex. Piggy 🐷  Bank'
                            value={account.name}
                            onChange={onChange} />
                    </div>
                    <div className='w-full flex space-x-2 items-center'>
                        <div className='w-full'>
                            <label className="form-label">balance:</label>
                            <input 
                                className="form-input focus:outline focus:outline-3 focus:outline-cyan-200"
                                type="text"
                                inputMode="decimal"
                                name="balance"
                                placeholder='$0.00'
                                value={account.balance}
                                onChange={onChange} />
                        </div>
                        <div className='w-full'>
                            <label className="form-label">type:</label>
                            <select
                                className="form-select form-input focus:outline 
                                           focus:border-4 focus:outline-cyan-200
                                            border-2 border-transparent text-white"
                                name="type"
                                value={account.type}
                                onChange={onChange}>
                                    <option value={null}>--Select--</option>
                                    <option
                                        value={0}>Checking</option>
                                    <option
                                        value={1}>Savings</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='flex space-x-6 justify-around'>
                    <button onClick={hide} className='card-btn card-btn-close'>
                        close
                    </button>
                    <button onClick={() => submit(account)} className='card-btn'>
                        submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccountForm;