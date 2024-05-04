import axios from "axios";
import { PARAM_FUNCTION, TIME_SERIES_INTRADAY } from "../constants";
import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";

type ContextType = {
  chartData: any,
  chartLoading: boolean,
  dataQuery: Record<string, string>,
}

type DispatchContextType = {
  setChartData: Dispatch<SetStateAction<any>>;
  setChartLoading: Dispatch<SetStateAction<boolean>>;
  setDataQuery: Dispatch<SetStateAction<Record<string, string>>>;
};

const StockContext: React.Context<ContextType> = createContext(undefined as any);
const StockDispatchContext: React.Context<DispatchContextType> = createContext(undefined as any);

function StockDataProvider({ children }: { children: React.ReactNode }) {
  const [dataQuery, setDataQuery] = useState<Record<string, string>>({
    symbol: "IBM", // default symbol
    interval: "5min", // default interval
    [PARAM_FUNCTION]: "TIME_SERIES_INTRADAY", // default function
  });
  const [chartData, setChartData] = useState<any>(null);
  const [chartLoading, setChartLoading] = useState<boolean>(false);

  useEffect(() => {
    const modifyUrl = () => {
      if (dataQuery.function === TIME_SERIES_INTRADAY) {
        return `function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min`
        // return `function=TIME_SERIES_INTRADAY&symbol=${dataQuery.symbol}&interval=${dataQuery.interval}`
      } else {
        return `function=${dataQuery.function}&symbol=IBM`
        // return `function=${dataQuery.function}&symbol=${dataQuery.symbol}`
      }
    }

    const getStockData = async () => {
      setChartLoading(true);
      const response = await axios.get(`https://www.alphavantage.co/query?${modifyUrl()}&apikey=demo`);
      // const response = await axios.get(`https://www.alphavantage.co/query?${modifyUrl()}&apikey=${process.env.REACT_APP_API_KEY}`);

      setChartData(response.data);
      setChartLoading(false);
    }

    getStockData();
  }, [dataQuery.interval, dataQuery.function, dataQuery.symbol]);

  const contextValues = {
    dataQuery,
    chartData,
    chartLoading
  }

  const contextSetterValues = {
    setDataQuery,
    setChartData,
    setChartLoading
  }

  return (
    <StockContext.Provider value={contextValues}>
      <StockDispatchContext.Provider value={contextSetterValues}>
        {children}
      </StockDispatchContext.Provider>
    </StockContext.Provider>
  );
}

export { StockDataProvider, StockContext, StockDispatchContext };