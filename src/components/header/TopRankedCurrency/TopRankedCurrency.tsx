import styles from './TopRankedCurrency.module.scss'

function TopRankedCurrency() {

    return (
        <div className={styles.currencyNavbar}>
            <div> Биткоин 1</div>
            <div> Биткоин 2</div>
            <div> Биткоин 3</div>
        </div>
    );
}

export default TopRankedCurrency;
