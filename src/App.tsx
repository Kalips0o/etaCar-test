import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';

import CurrencyStatistics from './pages/сurrencyStatistics/CurrencyStatistics';
import MainPage from './pages/mainPage/MainPage';
import Layout from './stories/layout/Layout';
import ErrorPage from './stories/errorPage/ErrorPage';


function App() {
    return (
        <div className='App'>
            <div className='wrapper'>
                <Layout />
                <Routes>
                    <Route path='/etaCar-test' element={<MainPage />} />
                    <Route path='/' element={<MainPage />} />
                    <Route path='/currency-statistics' element={<CurrencyStatistics />} />
                    <Route path='*' element={<ErrorPage />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
