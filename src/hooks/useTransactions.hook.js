import { useEffect, useState } from "react";
import TransactionService from '../components/transactions/services/transaction.service';

const useTransactions = () => {
    const [transactions, setTransactions] = useState(() => {
        let storage = localStorage.getItem("transactions");

        return JSON.parse(storage) || null;
    });

    useEffect(() => !transactions && getAll());
    useEffect(() => {
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }, [transactions]);

    const store = data => {
        setTransactions([...data]); 
        localStorage.setItem("transactions", JSON.stringify(data))
    };

    const getAll = () => {
        TransactionService.getAll() 
            .then(res => store(res.data))
            .catch(err => console.err(err));
    };

    const handleTransactions = trs => setTransactions(trs);

    return { transactions, handleTransactions };
};

export default useTransactions;