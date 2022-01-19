import React, { useState } from "react";
import Modal from "./Modal/modal.component"

const Dashboard = () => {
    const [show, setShow] = useState(false);

    const showModal = () => setShow(true);
    const hideModal = () => setShow(false);

    return (
        <main className="w-full h-full flex flex-col items-center justify-center">
            <h1 className="text-[2rem]">Modal Expirement</h1>
            {show && <Modal show={show} handleClose={hideModal} />}
            <button className="bg-violet-500 py-2 px-4 rounded text-white" onClick={showModal}>
                Open
            </button>
        </main>
    );
};

export default Dashboard;