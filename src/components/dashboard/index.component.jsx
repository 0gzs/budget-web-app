import React, { useState } from "react";
import Modal from "../modal/modal.component";
import Accounts from "../../domain/account/index.component";
import Categories from '../../domain/category/index.component';
import useAccounts from "../../hooks/useAccounts.hook";
import useCategories from "../../hooks/useCategories.hook";

const Dashboard = () => {
    const { accounts, handleAccountsUpdate } = useAccounts();
    const { categories, error, isLoading, handleCategoriesUpdate } = useCategories();

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

            <Categories categories={categories} handleForm={handleFormModal} handleUpdate={handleCategoriesUpdate} isLoading={isLoading}/>
        </main>
    );
};

export default Dashboard;