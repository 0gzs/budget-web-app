import React, { useEffect } from "react";
import Dashboard from './components/dashboard/index.component';

const App = ()  => {
  const userId = "61df6b800b7ab5b94fbb4497";

  useEffect(() => { localStorage.setItem("userId", userId) }, []);

  return (
    <Dashboard />
  );
}

export default App;
