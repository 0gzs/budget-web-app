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
        } else if (action == "delete") {
            accountsState = accountsState.filter(account => account._id !== response);
        } else {
            accountsState = updateAccounts(response);
        }
        setAccounts([...accountsState]);
        localStorage.setItem("accounts", JSON.stringify(accountsState))
    };

    const updateAccounts = account => {
        let accounts = JSON.parse(localStorage.getItem("accounts"));
        accounts = accounts.filter(a => a._id !== account._id);
        accounts.push(account);
        return accounts;
    };

    return { accounts, handleAccountsUpdate };
}

export default useAccounts;