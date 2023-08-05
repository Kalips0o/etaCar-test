import React, { useState } from 'react';
import styles from './NavBar.module.scss';
import TopRankedCurrency from './TopRankedCurrency/TopRankedCurrency';
import Portfolio from '../portfolio/Portfolio'; // Исправляем путь

function NavBar() {
    const [portfolioAmount, setPortfolioAmount] = useState('');

    const updatePortfolioAmount = (amount: string) => {
        setPortfolioAmount(amount);
    };

    return (
        <div className={styles.navbar}>
            <div className={styles.companyName}>Logo</div>
            <div className={styles.navbarCenter}>
                <TopRankedCurrency />
            </div>
            <div className={styles.navbarRight}>
                <Portfolio amount={portfolioAmount} />
            </div>
        </div>
    );
}

export default NavBar;
