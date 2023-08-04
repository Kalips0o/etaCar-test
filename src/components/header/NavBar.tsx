import Portfolio from "../portfolio/Portfolio";
import styles from './NavBar.module.scss'
import TopRankedCurrency from "./TopRankedCurrency/TopRankedCurrency";

function NavBar() {
    return (
        <div className={styles.navbar}>
            <div className={styles.companyName}> Logo</div>
            <div className={styles.navbarCenter}>
                <TopRankedCurrency/>
            </div>
            <div className={styles.navbarRight}>
                <Portfolio/>
            </div>
        </div>
    );
}

export default NavBar
