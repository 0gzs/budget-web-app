import React, { useEffect, useState } from "react"; 
import dollarUS from "../utilities/currency-formatter";
import AccountService from "../services/account.service"; 
import AddAccount from "../components/add-account.component";

const Accounts = () => {
    const [show, setShow] = useState(false);
    const [accounts, setAccounts] = useState(() => {
        let storage = localStorage.getItem("accounts");
        let parsed = JSON.parse(storage);

        return parsed || null;
    });

    useEffect(() => {
        if (!accounts) getAll();
    }, [accounts]);

    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    const getAll = () => {
        AccountService.getAll()
            .then(res => {
                setAccounts([...res.data]);
                localStorage.setItem("accounts", JSON.stringify(res.data));
            })
            .catch(err => console.log(err));
    };

    const deleteOne = id => {
        AccountService.delete(id)
            .then(() => {
              let accountsState = [...accounts];
              accountsState = accountsState.filter(account => account._id !== id);
              setAccounts([...accountsState]);
            })
            .catch(err => console.log(err));
    };

    const handleAddAccount = account => {
        const accountsState = [...accounts];
        accountsState.push(account);
        setAccounts([...accountsState]);
        handleClose();
    };

    const showEditBtn = () => document.getElementById("edit-btns").style.display = "flex";
    const hideEditBtn = () => document.getElementById("edit-btns").style.display = "none";
    
    const Account = ({ account }) => {
        return (
            <div className="w-full flex items-center justify-between" onMouseEnter={showEditBtn} onMouseLeave={hideEditBtn}>
                <div className="flex items-center">
                    <i className="bi bi-bank mr-2"></i>
                    <p className="inline-block text-lg font-medium text-black">{account.name}</p>
                </div>
                <div className="w-full hover:flex hover:flex-row justify-end none" id="edit-btns">
                    <button className="mr-1"><i className="bi bi-pencil text-gray-300 hover:text-gray-400"></i> </button>
                    <button className="mr-1" onClick={() => deleteOne(account._id)}><i className="bi bi-trash text-red-400 hover:text-red-600"></i></button>
                </div>
                <div className="flex items-center">
                    <p className="text-green-800">{dollarUS.format(account.balance)}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="mb-4">            
            <div className="py-4 max-h-full">
                {accounts && accounts.map((account, i) => {
                    return <Account account={account} key={i} />
                })}
            </div>

            {accounts && 
                (<button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                    onClick={handleOpen}>Add Account</button>
            )}

            {show && <AddAccount handleClose={handleClose} handleAddAccount={handleAddAccount} />   }

        </div>
    );
};

export default Accounts;