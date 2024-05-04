import { useContext } from "react";
import { INTERVAL_OPTIONS } from "../utils/constants";
import useComponentVisible from "../utils/hooks/useComponentVisible";
import { StockContext, StockDispatchContext } from "../utils/contexts/StockContext";

const IntervalSelector = () => {
  const stockDataObj = useContext(StockContext);
  const setStockDataObj = useContext(StockDispatchContext);

  const { wrapRef, toggleChild, isComponentVisible } = useComponentVisible();

  const onIntervalSelect = (interval: string) => {
    setStockDataObj((prev: Record<string, string>) => ({
      ...prev,
      interval: interval
    }))
  }

  return (
    <div className="relative cursor-pointer" ref={wrapRef} onClick={toggleChild}>
      <span className='font-semibold text-sm px-3 py-2 hover:bg-gray-100'>
        {stockDataObj.interval}
      </span>
      {
        isComponentVisible && (
          <div className="bg-white absolute top-10 w-[80px] rounded-md shadow-lg py-2">
            {
              INTERVAL_OPTIONS.map(el => {
                return (
                  <div onClick={() => onIntervalSelect(el)} key={el} className='w-full font-medium text-sm p-2 bg-white hover:bg-gray-100 transition-all duration-200 ease-in-out'>
                    <span>{el}</span>
                  </div>
                );
              })
            }
          </div>
        )
      }
    </div>
  );
}

export default IntervalSelector;