import React, { useState } from "react";
import Modal from "./modal/modal.component";
import Accounts from "./accounts.component";
import Categories from './categories.component';
import useAccounts from "../hooks/useAccounts.hook";

const Dashboard = () => {
    const { accounts, handleAccountsUpdate } = useAccounts();
    // const { categories, handleCategoriesUpdate } = useCategories();

    const [show, setShow] = useState(false);
    const [form, setForm] = useState("");

    const showModal = () => setShow(true);
    const hideModal = () => setShow(false);

    const handleFormModal = name => {
        setForm(name);
        showModal();
    };

    return (
        <main className="w-full h-full px-16">
            {show && <Modal show={show} handleClose={hideModal} formName={form} handleAccountsUpdate={handleAccountsUpdate} />}

            <Accounts accounts={accounts} handleForm={handleFormModal} handleUpdate={handleAccountsUpdate} />            
            <Categories handleForm={handleFormModal} />
        </main>
    );
};

export default Dashboard;