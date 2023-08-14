import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../assets/pngwing.com.png';
import TopRankedCurrency from '../../stories/topRankedCurrency/TopRankedCurrency';
import Portfolio from '../../stories/portfolio/Portfolio';
import { Currency } from '../../types/apiTypes';
import { useTopRankedCurrencies } from '../../hooks/hooks';

interface TopRankedCurrencyProps {
    id: string;
    name: string;
    symbol: string;
    priceUsd: number;
}

function Header() {
    const topRankedCurrencyData = useTopRankedCurrencies();

    const prepareTopRankedCurrency = (currency: Currency): TopRankedCurrencyProps => {
        return {
            id: currency.id,
            name: currency.name,
            symbol: currency.symbol,
            priceUsd: parseFloat(currency.priceUsd),
        };
    };

    return (
        <div className={styles.header}>
            <header className={styles.navbar}>
                <NavLink to={'/'}>
                    <img className={styles.company_logo} src={logo} alt="" />
                </NavLink>
                <div className={styles.navbar_center}>
                    {topRankedCurrencyData.map((topRankedCurrency) => {
                        return <TopRankedCurrency key={topRankedCurrency.id} {...prepareTopRankedCurrency(topRankedCurrency)} />;
                    })}
                </div>
                <div className={styles.navbar_right}>
                    <Portfolio />
                </div>
            </header>
        </div>
    );
}

export default Header;
