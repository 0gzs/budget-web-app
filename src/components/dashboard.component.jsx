import React, { useState } from "react";

const Dashboard = () => {
    const [show, setShow] = useState(false);

    const showModal = setShow(true);
    const hideModal = setShow(false);

    return (
        <div>
            <h1>Modal Expirement</h1>
        </div>
    );
};

export default Dashboard;