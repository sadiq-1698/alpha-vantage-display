import { useContext } from "react";
import PerformanceStat from "../performance-stat";
import { StockContext } from "../../utils/contexts/StockContext";
import toFixedIfNecessary from "../../utils/methods/to-fixed-if-necessary";

const LatestStats = () => {
  const { lastTradedData, lastTradedLoading } = useContext(StockContext);

  const isNegativeChange = !lastTradedLoading && lastTradedData && Number(lastTradedData["09. change"]) < 0;

  const textClass = isNegativeChange ? "text-red-800" : "text-green-800"

  return (
    <div className="p-4 lg:p-10 lg:h-full w-full lg:w-[30%] lg:border-l-2 lg:border-solid lg:border-b-slate-700">
      {
        lastTradedLoading ? (
          <div className="h-full flex justify-center items-start">
            <p>Loading...</p>
          </div>
        ) : (
          <>
            {
              lastTradedData && !lastTradedData["Information"] ?
                <>
                  <h1 className="font-bold text-xl">{lastTradedData["01. symbol"]}</h1>

                  <h1 className="font-semibold text-2xl">
                    {toFixedIfNecessary(Number(lastTradedData["05. price"]), 2)}
                    &nbsp;<span className={`${textClass} text-sm font-medium`}>
                      {isNegativeChange ? "-" : "+"}
                      {toFixedIfNecessary(Number(lastTradedData["09. change"]), 2)}
                      &nbsp;
                      {isNegativeChange ? "(-" : "(+"}
                      {lastTradedData["10. change percent"] + ")"}
                    </span>
                  </h1>

                  <p className="text-gray-400 text-xs">
                    {new Date(lastTradedData["07. latest trading day"]).toLocaleDateString("en-US", {
                      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </p>

                  <h1 className="mt-4 text-sm font-bold">Performance</h1>

                  <div className="flex flex-wrap gap-4 mt-3">
                    <PerformanceStat
                      label="High"
                      value={String(toFixedIfNecessary(Number(lastTradedData["03. high"]), 2))}
                    />
                    <PerformanceStat
                      label="Low"
                      value={String(toFixedIfNecessary(Number(lastTradedData["04. low"]), 2))}
                    />
                    <PerformanceStat
                      label="Open"
                      value={String(toFixedIfNecessary(Number(lastTradedData["02. open"]), 2))}
                    />
                    <PerformanceStat
                      label="Volume"
                      value={lastTradedData["06. volume"]}
                    />
                  </div>
                </>
                :
                (
                  <div className="h-full flex justify-center items-start">
                    <p>API limit reached!</p>
                  </div>
                )
            }
          </>
        )
      }
    </div>
  );
}

export default LatestStats;