import React, { useEffect, useState } from 'react';
import TopRankedCurrency from '../../stories/topRankedCurrency/TopRankedCurrency';
import { Currency } from '../../types/apiTypes';
import styles from './Header.module.scss';
import logo from '../../assets/pngwing.com.png';
import Portfolio from '../../stories/portfolio/Portfolio';
import { fetchCryptoData } from '../../api/Api';
import { NavLink } from 'react-router-dom';

interface TopRankedCurrencyProps {
    id: string;
    name: string;
    symbol: string;
    priceUsd: number;
}

function Header() {
    const [topRankedCurrencyData, setTopRankedCurrencyData] = useState<Currency[]>([]);

    const prepareTobRankedCurrency = (currency: Currency): TopRankedCurrencyProps => {
        return {
            id: currency.id,
            name: currency.name,
            symbol: currency.symbol,
            priceUsd: parseFloat(currency.priceUsd),
        };
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchCryptoData();
                const topThreeCurrencies = data.data.slice(0, 3);
                setTopRankedCurrencyData(topThreeCurrencies);
            } catch (error) {
                console.error('An error occurred:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <div className={styles.header}>
        <header className={styles.navbar}>
            <NavLink to={'/'}>
                <img className={styles.company_logo} src={logo} alt="" />
            </NavLink>
            <div className={styles.navbar_center}>
                {topRankedCurrencyData.map((topRankedCurrency) => {
                    return <TopRankedCurrency key={topRankedCurrency.id} {...prepareTobRankedCurrency(topRankedCurrency)} />;
                })}
            </div>
            <div className={styles.navbar_right}>
                <Portfolio />
            </div>
        </header></div>
    );
}

export default Header;
