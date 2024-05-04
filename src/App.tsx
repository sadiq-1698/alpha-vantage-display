import React from 'react';
import './App.css';
import Header from './components/header';
import DataBody from './components/data-body';
import { StockDataProvider } from './utils/contexts/StockContext';

function App() {
  return (
    <>
      <StockDataProvider>
        <Header />
        <DataBody />
      </StockDataProvider>
    </>
  );
}

export default App;
