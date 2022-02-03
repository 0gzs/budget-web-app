import { useEffect, useState } from "react";
import { getAllTransactions } from "../services/TransactionService";

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
        if (!transactions) getTransactions();

        async function getTransactions() {
            const data = await getAllTransactions();
            store(data);
        }
    }, [transactions]);

    const handleTransactions = trs => setTransactions(trs);

    return { transactions, handleTransactions };
};

export default useTransactions;