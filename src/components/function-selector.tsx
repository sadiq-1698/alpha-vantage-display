import { useContext } from "react";
import useComponentVisible from "../utils/hooks/useComponentVisible";
import { PARAM_FUNCTION, TIME_SERIES_FUNCTIONS } from "../utils/constants";
import { StockContext, StockDispatchContext } from "../utils/contexts/StockContext";

const FunctionSelector = () => {
  const { dataQuery } = useContext(StockContext);
  const { setDataQuery } = useContext(StockDispatchContext);

  const { wrapRef, toggleChild, isComponentVisible } = useComponentVisible();

  const onFunctionSelect = (func: string) => {
    setDataQuery((prev: Record<string, string>) => ({
      ...prev,
      [PARAM_FUNCTION]: func
    }))
  }

  return (
    <div className="relative cursor-pointer" ref={wrapRef} onClick={toggleChild}>
      <span className='font-semibold text-sm px-3 py-2 hover:bg-gray-100'>
        {TIME_SERIES_FUNCTIONS.find(el => el.val === dataQuery[PARAM_FUNCTION])?.label}
      </span>

      {
        isComponentVisible && (
          <div className="bg-white absolute top-10 w-[140px] rounded-md shadow-lg py-2">
            {
              TIME_SERIES_FUNCTIONS.map(el => {
                return (
                  <div
                    key={el.val}
                    onClick={() => onFunctionSelect(el.val)}
                    className='w-full font-medium text-sm p-2 bg-white hover:bg-gray-100 transition-all duration-200 ease-in-out'
                  >
                    <span>{el.label}</span>
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

export default FunctionSelector;