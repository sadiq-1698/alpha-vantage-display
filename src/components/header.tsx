import React from 'react';
import SymbolSelector from './symbol-selector';
import SelectorDivider from './selector-divider';
import IntervalSelector from './interval-selector';
import FunctionSelector from './function-selector';

function Header() {
  return (
    <div className='px-4 flex items-center h-10 shadow-xl absolute top-0 left-0 w-full z-50 bg-white'>
      <div className='header-content flex items-center'>
        <SymbolSelector />
        <SelectorDivider />
        <IntervalSelector />
        <SelectorDivider />
        <FunctionSelector />
      </div>
    </div>
  );
}

export default Header;
