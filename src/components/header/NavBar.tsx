import React from 'react';
import styles from './NavBar.module.scss';
import TopRankedCurrency from './TopRankedCurrency/TopRankedCurrency';
import Portfolio from '../portfolio/Portfolio';

function NavBar() {
    return (
        <div className={styles.navbar}>
            <div className={styles.companyName}>Logo</div>
            <div className={styles.navbarCenter}>
                <TopRankedCurrency />
            </div>
            <div className={styles.navbarRight}>
                <div style={{ cursor: 'pointer' }}>
                    <Portfolio />
                </div>
            </div>
        </div>
    );
}

export default NavBar;
