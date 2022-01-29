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
        if (accounts) calculateBalance();
    }, [accounts]);

    const calculateBalance = () => {
        let b = 0;
        accounts.forEach(account => b += account.balance);
        setBalance(b);
    }

    const store = data => {
        setAccounts([...data]); 
        localStorage.setItem("accounts", JSON.stringify(data));
        calculateBalance();
    };

    const getAll = async () => {
        await AccountService.getAll()
            .then(res => store(res.data))
            .catch(err => console.log(err));
    };

    const handleAccounts = acc => store(acc);

    return { accounts, handleAccounts, balance };
}

export default useAccounts;