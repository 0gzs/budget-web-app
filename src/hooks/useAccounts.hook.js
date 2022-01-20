import { useState, useEffect } from 'react';
import AccountService from '../domain/account/services/account.service';

const useAccounts = () => {
    const [accounts, setAccounts] = useState(() => {
        let storage = localStorage.getItem("accounts");

        return JSON.parse(storage) || null;
    });

    useEffect(() => !accounts && getAll());

    const getAll = () => {
        AccountService.getAll()
            .then(res => {
                setAccounts([...res.data]);
                localStorage.setItem("accounts", JSON.stringify(res.data));
            })
            .catch(err => console.log(err));
    };

    const handleAccountsUpdate = (response, action) => {
        let accountsState = [...accounts];

        if (action === "add") {
            accountsState.push(response);
        } else {
            accountsState = accountsState.filter(account => account._id !== response);
        }
        setAccounts([...accountsState]);
        localStorage.setItem("accounts", JSON.stringify(accountsState))
    };

    return { accounts, handleAccountsUpdate };
}

export default useAccounts;