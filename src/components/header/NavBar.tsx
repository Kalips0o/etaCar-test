import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import TopRankedCurrency from './TopRankedCurrency/TopRankedCurrency';
import { Currency } from '../../types/apiTypes';
import styles from './NavBar.module.scss';
import logo from './../../assets/pngwing.com.png';
import Portfolio from '../portfolio/Portfolio';

interface TopRankedCurrencyProps {
    id: string,
    name: string,
    symbol: string,
    priceUsd: number
}


function NavBar() {

    const [topRankedCurrencyData, setTopRankedCurrencyData] = useState<Currency[]>([]);

    const prepareTobRankedCurrency = (currency: Currency): TopRankedCurrencyProps => {
        return {
            id: currency.id,
            name: currency.name,
            symbol: currency.symbol,
            priceUsd: parseFloat(currency.priceUsd),
        };
    };

    useEffect((): void => {

        axios.get('https://api.coincap.io/v2/assets', {
            params: {
                limit: 3,
            },
        }).then(res => {
            setTopRankedCurrencyData(res.data.data);
        }).catch(err => {

        });
    }, []);

    return (
        <header className={styles.navbar}>
            <div className={styles.companyName}><img style={{
                width: '220px',
                height: '80px',
            }} src={logo} /></div>
            <div className={styles.navbarCenter}>
                {topRankedCurrencyData.map((topRankedCurrency) => {
                    return <TopRankedCurrency
                        key={topRankedCurrency.id} {...prepareTobRankedCurrency(topRankedCurrency)} />;
                })}
            </div>
            <div className={styles.navbarRight}>
                <Portfolio />
            </div>
        </header>
    );
}

export default NavBar;
