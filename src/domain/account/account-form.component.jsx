import React, { useState } from 'react';
import ButtonGroup from '../../components/form/button-group.component';
import AccountService from './services/account.service';

const AccountForm = ({ cancel, close, handleUpdate }) => {
    const [initialState, setInitialState] = useState({
        name: "",
        balance: "",
        type: "",
        user: localStorage.getItem("userId")
    });
    const [account, setAccount] = useState(initialState);

    const handleInputChange = (e, name) => { 
        if (name === "balance" && isNaN(e.target.value)) return;
        setAccount({ ...account, [name]: e.target.value }) 
    };

    const saveAccount = () => {
        AccountService.create(account)
            .then(res => handleUpdate(res.data, "add"))
            .catch(err => console.log(err))
            .finally(close);
    }

    return (
        <div className="flex flex-col space-y-5">
            <input 
                className="border rounded-md px-2 py-1 placeholder-italic" 
                type="text"
                value={account.name}
                onChange={e => handleInputChange(e, "name")}
                placeholder="Account name" 
                />
            <div className="flex flex-wraps space-x-1 relative">
                <input 
                    className="border rounded-md px-2 py-1 placeholder-italic w-1/3"
                    type="text"
                    value={account.balance}
                    onChange={e => handleInputChange(e, "balance")}
                    placeholder="$100.00"
                    />
                <select 
                    className="w-3/4 px-2 py-1 form-select appearance-none block text-base font-normal text-gray-500 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:outline-none" aria-label="Default select example"
                    onChange={e => handleInputChange(e, "type")}
                    value={account.type}
                    >
                        <option>-Select-</option>
                        <option value={"checking"}>Checking</option>
                        <option value={"savings"}>Savings</option>
                </select>
            </div>
            <ButtonGroup cancel={cancel} submit={saveAccount} />
        </div>
    );
};

export default AccountForm;