import { useState, useEffect } from 'react';
import AccountService from '../components/accounts/services/account.service';

const useAccounts = () => {
    const [accounts, setAccounts] = useState(() => {
        let storage = localStorage.getItem("accounts");

        return JSON.parse(storage) || null;
    });

    useEffect(() => !accounts && getAll());

    const store = data => {
        setAccounts([...data]); 
        localStorage.setItem("accounts", JSON.stringify(data))
    };

    const getAll = () => {
        AccountService.getAll()
            .then(res => store(res.data))
            .catch(err => console.log(err));
    };

    const handleAccounts = acc => setAccounts(acc);

    return { accounts, handleAccounts };
}

export default useAccounts;