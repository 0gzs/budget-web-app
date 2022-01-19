import { useState, useEffect } from 'react';
import AccountService from '../services/account.service';

const useAccounts = () => {
    const [accounts, setAccounts] = useState(() => {
        let storage = localStorage.getItem("accounts");
        let parsed = JSON.parse(storage);

        return parsed || null;
    });

    useEffect(() => !accounts && getAll());
    useEffect(() => { localStorage.setItem("accounts", JSON.stringify(accounts)) }, [accounts])

    const getAll = () => {
        AccountService.getAll()
            .then(res => {
                setAccounts([...res.data]);
                localStorage.setItem("accounts", JSON.stringify(res.data));
            })
            .catch(err => console.log(err));
    };

    const handleAccountsUpdate = (response, action) => {
        if (action === "add") {
            let accountsState = [...accounts];
            accountsState.push(response);
            setAccounts([...accountsState]);
        } else {
            let accountsState = [...accounts];
            accountsState = accountsState.filter(account => account._id !== response);
            setAccounts([...accountsState]);
        }
    };

    return { accounts, handleAccountsUpdate };
}

export default useAccounts;