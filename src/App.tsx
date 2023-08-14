import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';

import CurrencyStatistics from './pages/сurrencyStatistics/CurrencyStatistics';

import Stats from './stories/stats/Stats';
import Header from './components/header/Header';
import MainPage from './pages/mainPage/MainPage';


function App() {
    return (
        <div className='App'>
            <div className='wrapper'>
                <Header />
                <Stats />
                <Routes>
                    <Route path='*' element={<MainPage />} />
                    <Route path='/currency-statistics' element={<CurrencyStatistics />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
