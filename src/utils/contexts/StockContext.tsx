import axios from "../../api/axios";
import { PARAM_FUNCTION, TIME_SERIES_INTRADAY } from "../constants";
import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";

type ContextType = {
  chartData: any,
  chartLoading: boolean,
  lastTradedLoading: boolean,
  dataQuery: Record<string, string>,
  lastTradedData: Record<string, string> | null,
}

type DispatchContextType = {
  setChartData: Dispatch<SetStateAction<any>>;
  setChartLoading: Dispatch<SetStateAction<boolean>>;
  setLastTradedLoading: Dispatch<SetStateAction<boolean>>;
  setDataQuery: Dispatch<SetStateAction<Record<string, string>>>;
  setLastTradedData: Dispatch<SetStateAction<Record<string, string> | null>>,
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
  const [lastTradedLoading, setLastTradedLoading] = useState<boolean>(false);
  const [lastTradedData, setLastTradedData] = useState<Record<string, string> | null>(null);

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
      const response = await axios.get(`?${modifyUrl()}&apikey=demo`);
      // const response = await axios.get(`?${modifyUrl()}&apikey=${process.env.REACT_APP_API_KEY}`);

      setChartData(response.data);
      setChartLoading(false);
    }

    getStockData();
  }, [dataQuery.interval, dataQuery.function, dataQuery.symbol]);

  useEffect(() => {
    const fetchLastTradedData = async () => {
      setLastTradedLoading(true);
      const response = await axios.get(`?function=GLOBAL_QUOTE&symbol=${dataQuery.symbol}&apikey=demo`);
      // const response = await axios.get(`?function=GLOBAL_QUOTE&symbol=${dataQuery.symbol}&apikey=${process.env.REACT_APP_API_KEY}`);

      if (response.data && response.data["Global Quote"]) {
        setLastTradedData(response.data["Global Quote"]);
      }

      setLastTradedLoading(false);
    }

    fetchLastTradedData();
  }, [dataQuery.symbol])

  const contextValues = {
    dataQuery,
    chartData,
    chartLoading,
    lastTradedData,
    lastTradedLoading
  }

  const contextSetterValues = {
    setDataQuery,
    setChartData,
    setChartLoading,
    setLastTradedData,
    setLastTradedLoading
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