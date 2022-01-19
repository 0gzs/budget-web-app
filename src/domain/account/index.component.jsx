import React from "react"; 
import dollarUS from "../../services/currency-formatter";
import AccountService from "./services/account.service"; 

const Accounts = ({ accounts, handleForm, handleUpdate }) => {
    const showEditBtn = () => document.getElementById("edit-btns").style.display = "flex";
    const hideEditBtn = () => document.getElementById("edit-btns").style.display = "none";

    const deleteAccount = id => {
        AccountService.delete(id)
            .then(() => handleUpdate(id, "delete"))
            .catch(err => console.log(err));
    };
    
    const Account = ({ account }) => {
        return (
            <div className="w-full flex items-center justify-between" onMouseEnter={showEditBtn} onMouseLeave={hideEditBtn}>
                <div className="flex items-center">
                    <i className="bi bi-bank mr-2"></i>
                    <p className="inline-block text-lg font-medium text-black">{account.name}</p>
                </div>
                <div className="w-full hover:flex hover:flex-row justify-end none" id="edit-btns">
                    <button className="mr-1"><i className="bi bi-pencil text-gray-300 hover:text-gray-400"></i> </button>
                    <button className="mr-1" onClick={() => deleteAccount(account._id)}><i className="bi bi-trash text-red-400 hover:text-red-600"></i></button>
                </div>
                <div className="flex items-center">
                    <p className="text-green-800">{dollarUS.format(account.balance)}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="border p-4">
            <h5 className="text-left text-xl font-light text-gray-700">Accounts</h5>
            
            <div>            
                <div className="py-4 max-h-full">
                    {accounts && accounts.map((account, i) => {
                        return <Account account={account} key={i} />
                    })}
                </div>

                {accounts && 
                    (<button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                        onClick={() => handleForm("account")}>Add Account</button>
                )}
            </div>
        </div>
    );
};

export default Accounts;