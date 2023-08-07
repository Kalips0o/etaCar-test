import React from "react";
import {Link} from "react-router-dom";
import {formatNumber} from "../../../utils/formatters";
import ClientRoutes from "../../../config/routes";
import styles from './TopRankedCurrency.module.scss'


interface TopRankedCurrencyProps {
    id: string,
    name: string,
    symbol: string,
    priceUsd: number
}
function TopRankedCurrency({
                               id,
                               name,
                               symbol,
                               priceUsd
                           }: TopRankedCurrencyProps) {

    return (
        <Link className={styles.currencyNavbar} to={`${ClientRoutes.CurrencyTable}?id=${id}`}>
            <div>{name} ({symbol})</div>
            <div>${formatNumber(priceUsd)}</div>
        </Link>
    );
}

export default TopRankedCurrency;
