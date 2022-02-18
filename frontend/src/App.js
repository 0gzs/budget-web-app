import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Dash from "./pages/dash/index.component";
import Login from "./pages/user/login.component";
import Register from "./pages/user/register.component";

const App = ()  => {
  return (
    <div className="flex w-full">
      <Routes>
        <Route exact path="/" element={<Dash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
        pauseOnHover />
    </div>
  );
}

export default App;
