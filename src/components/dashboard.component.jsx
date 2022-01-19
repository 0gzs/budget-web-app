import React, { useState } from "react";
import Accounts from "./accounts.component";
import Modal from "./modal/modal.component";

const Dashboard = () => {
    const [show, setShow] = useState(false);

    const showModal = () => setShow(true);
    const hideModal = () => setShow(false);

    return (
        <main className="w-full h-full">
            {show && <Modal show={show} handleClose={hideModal} formName={"account"} />}

            <div className="border">
                <h5 className="text-left text-xl font-light text-gray-700">Accounts</h5>
                <Accounts />
            </div>
        </main>
    );
};

export default Dashboard;