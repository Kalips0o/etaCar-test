import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';

import CurrencyStatistics from './components/сurrencyStatistics/CurrencyStatistics';

import Stats from './components/stats/Stats';
import Header from './components/header/Header';
import CryptoTable from './components/currencyTable/CryptoTable';


function App() {
    return (
        <div className='App'>
            <div className='wrapper'>
                <Header />
                <Stats />
                <Routes>
                    <Route path='*' element={<CryptoTable />} />
                    <Route path='/currency-statistics' element={<CurrencyStatistics />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
