import axios from "axios";
import { PARAM_FUNCTION } from "../constants";
import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";

const StockContext: React.Context<Record<string, string>> = createContext({});
const StockDispatchContext: React.Context<Dispatch<SetStateAction<Record<string, string>>>> = createContext(undefined as any);

function StockDataProvider({ children }: { children: React.ReactNode }) {
  const [dataQuery, setDataQuery] = useState<Record<string, string>>({
    [PARAM_FUNCTION]: "TIME_SERIES_INTRADAY",
    symbol: "IBM",
    interval: "5min",
  });

  useEffect(() => {
    const getStockData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=${dataQuery.interval}&apikey=${process.env.REACT_APP_API_KEY}`);

      console.log(response);
    }

    getStockData();
  }, [dataQuery.interval]);

  // console.log(dataQuery)

  return (
    <StockContext.Provider value={dataQuery}>
      <StockDispatchContext.Provider value={setDataQuery}>
        {children}
      </StockDispatchContext.Provider>
    </StockContext.Provider>
  );
}

export { StockDataProvider, StockContext, StockDispatchContext };