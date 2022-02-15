import { useEffect, useState } from "react";
import { getTransactions } from "../services/TransactionService";

const useTransactions = () => {
    const [transactions, setTransactions] = useState(() => {
        let storage = localStorage.getItem("transactions");

        return JSON.parse(storage) || null;
    });

    const store = data => {
        setTransactions([...data]); 
        localStorage.setItem("transactions", JSON.stringify(data))
    };

    useEffect(() => {
        if (!transactions) getAllTransactions();

        async function getAllTransactions() {
            const data = await getTransactions();
            
            data && store(data);
        }
    }, [transactions]);

    const handleTransactions = data => setTransactions(data);

    return { transactions, handleTransactions };
};

export default useTransactions;