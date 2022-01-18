import React, { useState } from "react";

const Dashboard = () => {
    const [show, setShow] = useState(false);

    const showModal = setShow(true);
    const hideModal = setShow(false);

    return (
        <div>
            <h1>Modal Expirement</h1>
            <button className="bg-violet-500 px-3 px-4" onClick={showModal}>
                Open
            </button>
            
        </div>
    );
};

export default Dashboard;