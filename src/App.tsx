import React from 'react';import {Route, Routes} from "react-router-dom";
import './App.scss';

import CryptoTable from './components/currencyTable/CurrencyTable';
import CurrencyStatistics from './components/сurrencyStatistics/CurrencyStatistics';

import Stats from './components/stats/Stats';
import Header from './components/header/Header';
import NewCurrencyTable from './components/currencyTable/NewCurrencyTable';


function App() {
  return (
    <div className="App">
        <div className='wrapper'>
        <Header/>
        <Stats/>
        <Routes>
            <Route path="*" element={<CryptoTable />} />
            <Route path="/currency-statistics" element={<CurrencyStatistics />} />
        </Routes>
    </div></div>
  );
}

export default App;
