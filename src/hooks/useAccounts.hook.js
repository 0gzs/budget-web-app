import { useState, useEffect, useCallback } from 'react';
import { getAllAccounts } from '../services/AccountService';

const useAccounts = () => {
    const [accounts, setAccounts] = useState(() => {
        let storage = localStorage.getItem("accounts");

        return JSON.parse(storage) || null;
    });
    const [balance, setBalance] = useState(0);

    const calculateBalance = useCallback(() => {
        if (!accounts) return;
        let b = 0;
        accounts.forEach(account => b += account.balance);
        setBalance(b);
    }, [accounts, setBalance])

    useEffect(() => {
        if (accounts) calculateBalance();
    }, [accounts, calculateBalance]);

    const store = accounts => {
        setAccounts([...accounts]); 
        localStorage.setItem("accounts", JSON.stringify(accounts))
    };

    useEffect(() => {
        if (!accounts) getAccounts();

        async function getAccounts() {
            const data = await getAllAccounts();
            store(data);
        }
    }, [accounts]);


    const handleAccounts = data => store(data);

    return { accounts, balance, handleAccounts};
}

export default useAccounts;