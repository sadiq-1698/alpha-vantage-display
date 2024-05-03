import React, { createContext, useState } from "react";

const StockContext: React.Context<any> = createContext(undefined);
const StockDispatchContext: React.Context<any> = createContext(undefined);

function UserProvider({ children }: { children: React.ReactNode }) {
  const [stockDetails, setUserDetails] = useState({
    username: "John Doe"
  });

  return (
    <StockContext.Provider value={stockDetails}>
      <StockDispatchContext.Provider value={setUserDetails}>
        {children}
      </StockDispatchContext.Provider>
    </StockContext.Provider>
  );
}

export { UserProvider, StockContext, StockDispatchContext };