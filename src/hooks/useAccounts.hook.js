import { useState, useEffect } from 'react';
import AccountService from '../components/accounts/services/account.service';

const useAccounts = () => {
    const [accounts, setAccounts] = useState(() => {
        let storage = localStorage.getItem("accounts");

        return JSON.parse(storage) || null;
    });
    const [balance, setBalance] = useState(0);

    useEffect(() => !accounts && getAll());
    useEffect(() => {
        let b = 0;
        if (accounts) accounts.forEach(account => b += account.balance);
        setBalance(b);
    }, [accounts]);

    const store = data => {
        setAccounts([...data]); 
        localStorage.setItem("accounts", JSON.stringify(data))
    };

    const getAll = async () => {
        await AccountService.getAll()
            .then(res => store(res.data))
            .catch(err => console.log(err));
    };

    const handleAccounts = acc => setAccounts(acc);

    return { accounts, handleAccounts, balance };
}

export default useAccounts;