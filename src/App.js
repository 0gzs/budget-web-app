import React, { useEffect } from "react";
import Dash from "./domain/dash/index.component";

const App = ()  => {
  const userId = "61df6b800b7ab5b94fbb4497";

  useEffect(() => { localStorage.setItem("userId", userId) }, []);

  return (
    <div className="flex w-full">
      <Dash />
    </div>
  );
}

export default App;
