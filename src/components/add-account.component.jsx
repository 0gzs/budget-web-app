import React, { useEffect, useState } from "react";
import AccountService from "../Services/account.service";

const AddAccount = ({ handleClose, handleAddAccount }) => {
    const [initialState, setInisialState] = useState({
        name: "",
        balance: 0,
        type: "",
        user: ""
    });
    const [userId, setUserId] = useState(localStorage.getItem("userId"));
    const [account, setAccount] = useState(initialState);

    useEffect(() => {
        setUserId(localStorage.getItem("userId"))
        setInisialState({
            name: "",
            balance: 0,
            type: "",
            user: ""
        });
    }, [setUserId]);

    useEffect(() => {
        const modal = document.getElementById("modal");
        if (modal) modal.style.display = "block";
    }, [])
    
    const handleInputChange = (e, name) => {
        setAccount({ ...account, [name]: e.target.value });
    };

    const saveAccount = () => {
        const data = {
            name: account.name,
            balance: account.balance,
            type: account.type,
            user: userId
        };

        AccountService.create(data)
            .then(res => {
                setAccount(initialState);
                handleAddAccount(res.data);
                handleClose();
            }).catch(err => console.log(err));
    };

    return (
        <div>
            <div id="modal" className="fixed hidden overflow-hidden inset-0 bg-gray-700 bg-opacity-50 overflow-y-auto h-full w-full"></div>
            
            <div className="p-6 w-[350px] rounded-md bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" 
                            htmlFor="name">Name</label>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-light focus:outline-none focus:shadhow-outline" 
                            type="text"
                            value={account.name} 
                            onChange={e => handleInputChange(e, "name")}
                            placeholder="Name" />
                    </div>
                    <div className="flex flex-row">
                        <div className="mb-4 w-3/4 mr-3">
                            <label 
                                className="block text-gray-700 text-sm font-bold mb-2" 
                                htmlFor="balance">Balance</label>
                            <input 
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-light focus:outline-none focus:shadhow-outline" 
                                type="float" 
                                value={account.balance}
                                onChange={e => handleInputChange(e, "balance")}
                                placeholder="$100.21" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">Type</label>
                            <div className="relative inline-block">
                                <select onChange={e => handleInputChange(e, "type")} value={account.type} className="mr-2 bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-light focus:outline-none focus:shadhow-outline">
                                    <option>Select</option>
                                    <option value="checking">Checking</option>
                                    <option value="savings">Savings</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>   
                            </div> 
                        </div>
                    </div>
                </form>
                <div className="flex w-full justify-around relative">
                    <button className="bg-gray-300 py-2 px-3 rounded text-gray-500 font-bold basis-3/5" onClick={handleClose}>Cancel</button>
                    <button className="bg-green-600 py-2 px-3 rounded text-white font-bold basis-3/7" onClick={saveAccount}>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default AddAccount;