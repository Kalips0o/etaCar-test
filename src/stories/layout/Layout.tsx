import React from 'react';
import Header from '../../components/header/Header';
import Stats from '../../components/stats/Stats';
import { useLocation } from 'react-router-dom';

function Layout() {
    const location = useLocation();

    return (
        <>
            {(location.pathname === '/' || location.pathname === '/currency-statistics' || location.pathname === '/etaCar-test') &&
            <Header />}
            <Stats />
        </>
    );
}

export default Layout;
