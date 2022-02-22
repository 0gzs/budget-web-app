import { useState, useEffect } from 'react';
import { getAccounts } from '../services/AccountService';

const useAccounts = () => {
    const [accounts, setAccounts] = useState(() => {
        let storage = localStorage.getItem("accounts");

        return JSON.parse(storage) || null;
    });
    const [totalBalance, setTotalBalance] = useState(0);

    const store = accounts => {
        setAccounts([...accounts]); 
        localStorage.setItem("accounts", JSON.stringify(accounts))
    };

    useEffect(() => {
        if (accounts) calculateBalance();

        async function calculateBalance() {
            let totalBal = 0;
            accounts.forEach(account => totalBal += account.balance);
            setTotalBalance(totalBal);
        }
    })
    
    useEffect(() => {
        if (!accounts) getAllAccounts();

        async function getAllAccounts() {
            const data = await getAccounts();
            
            data && store(data);
        }
    }, [accounts]);

    const handleAccounts = data => store(data);

    return { accounts, totalBalance, handleAccounts };
}

export default useAccounts;