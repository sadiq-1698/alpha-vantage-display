import React from 'react';

function Header() {
  return (
    <div className='px-4 flex items-center h-10 shadow-xl absolute top-0 left-0 w-full z-50 bg-white'>
      <div className='header-content flex items-center'>
        <span className='font-bold text-sm pr-3 border-r-2 border-solid border-gray-400'>NIFTY</span>
        <span className='font-semibold text-sm px-3 border-r-2 border-solid border-gray-400'>15m</span>
      </div>
    </div>
  );
}

export default Header;
