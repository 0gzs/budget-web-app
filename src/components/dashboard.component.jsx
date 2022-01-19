import React, { useState } from "react";
import Modal from "./modal/modal.component";
import Accounts from "./accounts.component";
import Categories from './categories.component';

const Dashboard = () => {
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
            {show && <Modal show={show} handleClose={hideModal} formName={form} />}

            <Accounts handleForm={handleFormModal} />            
            <Categories handleForm={handleFormModal} />
        </main>
    );
};

export default Dashboard;