import React, { useContext } from 'react';
import SymbolSelector from './symbol-selector';
import SelectorDivider from './selector-divider';
import IntervalSelector from './interval-selector';
import FunctionSelector from './function-selector';
import { TIME_SERIES_INTRADAY } from '../utils/constants';
import { StockContext } from '../utils/contexts/StockContext';

function Header() {
  const { dataQuery } = useContext(StockContext);

  return (
    <div className='px-4 flex items-center h-10 shadow-xl absolute top-0 left-0 w-full z-50 bg-white'>
      <div className='header-content flex items-center'>
        <SymbolSelector />
        <SelectorDivider />
        {dataQuery.function === TIME_SERIES_INTRADAY && <IntervalSelector />}
        <SelectorDivider />
        <FunctionSelector />
      </div>
    </div>
  );
}

export default Header;
