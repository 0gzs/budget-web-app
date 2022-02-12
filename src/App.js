import React from "react";
import { Route, Routes } from "react-router-dom";

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
    </div>
  );
}

export default App;
