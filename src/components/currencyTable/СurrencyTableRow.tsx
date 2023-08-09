import React from "react";
import {Link} from "react-router-dom";
import ClientRoutes from "../../config/routes";
import {formatNumber} from "../../utils/formatters";
import styles from "./CurrencyTableRow.module.scss";
import AddToPortfolio from '../portfolio/AddToPortfolio';


interface CurrencyTableRowProps {
    id: string,
    rank: string,
    name: string,
    symbol: string,
    priceUsd: number,
    marketCapUsd: number,
    volumeUsd24Hr: number,
    changePercent24Hr: number
}




function CurrencyTableRow({
                              id,
                              rank,
                              name,
                              symbol,
                              priceUsd,
                              marketCapUsd,
                              volumeUsd24Hr,
                              changePercent24Hr
                          }: CurrencyTableRowProps) {

    return (
        <div className={styles.currency_row}>
            <Link className={styles.link} to={`${ClientRoutes.CurrencyStatistics}?id=${id}`}>
                <div className={styles.currency_row_info}>
                    <div className={`${styles.cell} ${styles.rank}`}>{rank}</div>
                    <div className={`${styles.cell} ${styles.currency_name}`}>
                        <div>{name}</div>
                        <div>({symbol})</div>
                    </div>
                    <div className={`${styles.cell} ${styles.price}`}>
                        ${formatNumber(priceUsd)}
                    </div>
                    <div
                        className={`${styles.cell} ${styles.market_cap}`}>
                        {formatNumber(marketCapUsd)}
                    </div>
                    <div
                        className={`${styles.cell} ${styles.volume}`}>
                        {formatNumber(volumeUsd24Hr)}
                    </div>
                    <div className={`${styles.cell} ${styles.change}`}>
                        {changePercent24Hr > 0 ? "+" : ""}{formatNumber(changePercent24Hr)}%
                    </div>
                </div>
            </Link>
            <div className={`${styles.cell} ${styles.add_to_portfolio}`}>
                <AddToPortfolio {...{id, name, symbol, priceUsd}} />
            </div>
        </div>
    );
}

export default CurrencyTableRow;
