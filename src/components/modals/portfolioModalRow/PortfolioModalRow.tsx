import React, { useContext } from 'react';

import styles from './PortfolioModalRow.module.scss';
import {
    initialCurrencyPortfolioRowState,
    PortfolioModalContext,
    PortfolioModalContextState,
} from '../../../context/portfolioModal.context';
import { formatNumber } from '../../../utils/formatters';

export interface CurrencySummary {
    id: string,
    name: string,
    symbol: string,
    priceUsd: number
}

export interface CurrencySummaryWithAmount extends CurrencySummary {
    amount: number;
}


function PortfolioModalRow({
                               id,
                               name,
                               symbol,
                               priceUsd,
                               amount,
                           }: CurrencySummaryWithAmount) {
    const {
        lastAddedCurrencyToPortfolio,
        setLastAddedCurrencyToPortfolio,
        currencyPortfolioRows,
        setCurrencyPortfolioRows,
    } = useContext<PortfolioModalContextState>(PortfolioModalContext);

    const removePortfolioRow = (): void => {
        const notRemovedPortfolioRows = currencyPortfolioRows.filter((row) => row.id !== id);
        localStorage.setItem('currencyPortfolioRows', JSON.stringify(notRemovedPortfolioRows));
        if (id === lastAddedCurrencyToPortfolio.id) {
            setLastAddedCurrencyToPortfolio(initialCurrencyPortfolioRowState);
        }
        setCurrencyPortfolioRows(notRemovedPortfolioRows);
    };

    return (
        <div className={styles.portfolio_currency_row}>
            <div>
                <div className={styles.portfolio_currency_name}> {name} ({symbol})</div>
                <div className={styles.portfolio_currency_amount}>
                    Amount: {formatNumber(amount)}
                </div>
                <div className={styles.portfolio_currency_price}>
                    ${formatNumber(priceUsd)}
                </div>
            </div>
            <div className={styles.remove_button_container}>
                <button className={styles.remove_currency_button} onClick={() => removePortfolioRow()}>Remove</button>
            </div>
        </div>
    );
}

export default PortfolioModalRow;
