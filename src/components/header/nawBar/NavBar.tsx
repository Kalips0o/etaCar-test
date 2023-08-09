import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TopRankedCurrency from '../TopRankedCurrency/TopRankedCurrency';
import { Currency } from '../../../types/apiTypes';
import styles from './NavBar.module.scss';
import logo from '../../../assets/pngwing.com.png';
import Portfolio from '../../portfolio/Portfolio';
import { baseUrl } from '../../../api/baseUrl';
import { NavLink } from 'react-router-dom';

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

    useEffect(() => {
        axios.get(`${baseUrl}assets`, {
            params: {
                limit: 3,
            },
        }).then(res => {
            setTopRankedCurrencyData(res.data.data);
        }).catch(err => {
            console.error('An error occurred:', err);
        });
    }, []);
    return (
        <header className={styles.navbar}>
            <NavLink to={'/'}>
                <img className={styles.company_logo} src={logo} />
            </NavLink>
            <div className={styles.navbar_center}>
                {topRankedCurrencyData.map((topRankedCurrency) => {
                    return <TopRankedCurrency
                        key={topRankedCurrency.id} {...prepareTobRankedCurrency(topRankedCurrency)} />;
                })}
            </div>
            <div className={styles.navbar_right}>
                <Portfolio />
            </div>
        </header>
    );
}

export default NavBar;
