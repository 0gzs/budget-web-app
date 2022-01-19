import React, { useState } from "react";
import Accounts from "./accounts.component";
import Modal from "./modal/modal.component";

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
        <main className="w-full h-full">
            {show && <Modal show={show} handleClose={hideModal} formName={form} />}

            <div className="border">
                <h5 className="text-left text-xl font-light text-gray-700">Accounts</h5>
                <Accounts handleForm={handleFormModal} />
            </div>
        </main>
    );
};

export default Dashboard;