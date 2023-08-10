import React, { useContext, useEffect, useState } from 'react';
import PortfolioModal from '../modals/portfolioModal/PortfolioModal';
import styles from './Portfolio.module.scss';
import { PortfolioModalContext, PortfolioModalContextState } from '../../context/portfolioModal.context';
import { Currency } from '../../types/apiTypes';
import { formatNumber } from '../../utils/formatters';
import { CurrencySummaryWithAmount } from '../modals/portfolioModalRow/PortfolioModalRow';
import { fetchDataAndUpdateState } from '../../api/Api';


function Portfolio() {
    const {
        lastAddedCurrencyToPortfolio,
        currencyPortfolioRows,
        setCurrencyPortfolioRows,
        setShouldShowPortfolioModal,
    } = useContext<PortfolioModalContextState>(PortfolioModalContext);

    const [currentCurrencyData, setCurrentCurrencyData] = useState<Currency[]>([]);
    const [currentTotalPrice, setCurrentTotalPrice] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const preparePortfolioText = (): string => {
        const difference = currentTotalPrice - totalPrice;
        const differenceSign = difference > 0 ? '+' : '';
        const differenceUsd = formatNumber(difference);
        const differencePercentage = formatNumber(difference / totalPrice * 100);
        return `${formatNumber(totalPrice)} USD ${differenceSign}${differenceUsd} (${differenceSign}${differencePercentage}%)`;
    };

    useEffect(() => {
        const ids = currencyPortfolioRows.map(row => row.id);
        fetchDataAndUpdateState(ids, setCurrentCurrencyData);
    }, [currencyPortfolioRows]);

    useEffect((): void => {
        if (currencyPortfolioRows.length) {
            localStorage.setItem('currencyPortfolioRows', JSON.stringify(currencyPortfolioRows));
        }
    }, [currencyPortfolioRows]);

    useEffect((): void => {
        const storedPortfolioData = localStorage.getItem('currencyPortfolioRows');
        const portfolioData: CurrencySummaryWithAmount[] = storedPortfolioData ? JSON.parse(storedPortfolioData) : [];
        const existingRow = portfolioData.find(row => row.id === lastAddedCurrencyToPortfolio.id);

        if (existingRow) {
            const updatedPortfolioData = portfolioData.map((row) => {
                if (row.id === lastAddedCurrencyToPortfolio.id) {
                    return {
                        ...row,
                        priceUsd: row.priceUsd + lastAddedCurrencyToPortfolio.priceUsd,
                        amount: row.amount + lastAddedCurrencyToPortfolio.amount,
                    };
                }
                return row;
            });
            setCurrencyPortfolioRows(updatedPortfolioData);
        } else {
            if (lastAddedCurrencyToPortfolio.id !== '') {
                setCurrencyPortfolioRows([...portfolioData, lastAddedCurrencyToPortfolio]);
            } else {
                setCurrencyPortfolioRows([...portfolioData]);
            }
        }
    }, [lastAddedCurrencyToPortfolio]);

    useEffect((): void => {
        setTotalPrice(currencyPortfolioRows.reduce((acc, curr) => {
            return acc + curr.priceUsd;
        }, 0));
    }, [currencyPortfolioRows]);

    useEffect((): void => {
        setCurrentTotalPrice(currentCurrencyData.reduce((acc, curr) => {
            const currencyPortfolioRow = currencyPortfolioRows && currencyPortfolioRows.find(row => row.id === curr.id);
            const currentCurrencySummaryWithAmountAmount = currencyPortfolioRow ? currencyPortfolioRow.amount : 0;
            return acc + parseFloat(curr.priceUsd) * currentCurrencySummaryWithAmountAmount;
        }, 0));
    }, [currencyPortfolioRows, currentCurrencyData]);

    return (
        <div>
            <button className={styles.portfolio_button} onClick={() => setShouldShowPortfolioModal(true)}>
                {lastAddedCurrencyToPortfolio.id !== ''
                    ? <div>
                        {lastAddedCurrencyToPortfolio.name}
                        ({lastAddedCurrencyToPortfolio.symbol})
                        ${formatNumber(lastAddedCurrencyToPortfolio.priceUsd)}
                    </div>
                    : <>
                        {currencyPortfolioRows.length
                            ? <div>{preparePortfolioText()}</div>
                            : <div> Portfolio is Empty </div>
                        }
                    </>
                }
            </button>
            <PortfolioModal />
        </div>
    );
}

export default Portfolio;
