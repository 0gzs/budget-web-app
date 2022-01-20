import React, { useState } from "react";
import useAccounts from "../../hooks/useAccounts.hook";
import useCategories from "../../hooks/useCategories.hook";

import Modal from "../modal/modal.component";
import Accounts from "../../domain/account/index.component";
import Categories from '../../domain/category/index.component';
import Transactions from "../../domain/transaction/index.component";

const Dashboard = () => {
    const { accounts, handleAccountsUpdate } = useAccounts();
    const { categories, handleCategoriesUpdate } = useCategories();

    const [show, setShow] = useState(false);
    const [form, setForm] = useState("");

    const showModal = () => setShow(true);
    const hideModal = () => setShow(false);

    const handleFormModal = name => {
        setForm(name);
        showModal();
    };

    return (
        <main className="w-full h-full px-80 flex flex-col space-y-4">
            {show && <Modal show={show} handleClose={hideModal} formName={form} handleAccountsUpdate={handleAccountsUpdate} handleCategoriesUpdate={handleCategoriesUpdate} />}

            <Accounts accounts={accounts} handleForm={handleFormModal} handleUpdate={handleAccountsUpdate} />    
            <Categories categories={categories} handleForm={handleFormModal} handleUpdate={handleCategoriesUpdate} />
            <Transactions />
        </main>
    );
};

export default Dashboard;