import React, { useEffect } from "react";
// import Accounts from "./components/accounts.component";
// import Categories from "./components/categories.component";
// import Transactions from "./components/transactions.component"; 
// import ErrorBoundary from "./components/error-boundary.component";
import Dashboard from './components/dashboard.component';

const App = ()  => {
  const userId = "61df6b800b7ab5b94fbb4497";

  useEffect(() => {
    localStorage.setItem("userId", userId);
  }, []);

  return (
    <Dashboard />
    // <div className="w-full flex flex-col sm:flex-row flex-1">
    //     {/* <ErrorBoundary>
    //       <div className="overflow-hidden w-full min-w-[300px] md:w-1/3 py-8 px-4 border">
    //         <h5 className="text-left text-xl font-light text-gray-700">Accounts</h5>
    //         <Accounts />
    //       </div>
          
    //       <div className="relative w-full md:w-2/3 py-8 flex flex-col flex-1 overflow-auto">
    //         <Categories />

    //         <Transactions />
    //       </div>
    //     </ErrorBoundary> */}
    // </div>
  );
}

export default App;
