import { useEffect, useState } from "react";
import TransactionService from "../domain/transaction/services/transactions.service";

const useTransactions = () => {
    const [transactions, setTransactions] = useState(() => {
        let storage = localStorage.getItem("transactions");

        return JSON.parse(storage) || null;
    });

    useEffect(() => !transactions && getAll());

    const store = data => {
        setTransactions([...data]); 
        localStorage.setItem("transactions", JSON.stringify(data))
    };

    const getAll = () => {
        TransactionService.getAll() 
            .then(res => store(res.data))
            .catch(err => console.err(err));
    };

    const handleTransactionsUpdate = (response, action) => {
        let transactionsState = [...transactions];
        if (action === "add") transactionsState.push(response)
        else transactionsState = transactionsState.filter(transaction => transaction._id !== response);
        store(transactionsState);
    };  

    return { transactions, handleTransactionsUpdate };
};

export default useTransactions;