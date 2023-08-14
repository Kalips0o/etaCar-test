import React from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import styles from './CurrencyStatistics.module.scss';
import { formatNumber } from '../../utils/formatters';
import CryptoChart from '../../components/сryptoСhart/СryptoСhart';
import PortfolioModal from '../../components/modals/portfolioModal/PortfolioModal';

import AddToPortfolio from '../../stories/portfolio/AddToPortfolio';
import { useCurrencyStatistics } from '../../hooks/hooks';
import { Currency } from '../../types/apiTypes';
import { CurrencySummary } from '../../components/modals/portfolioModal/portfolioModalRow/PortfolioModalRow';


function CurrencyStatistics() {
    const prepareCurrencySummary = (currency: Currency): CurrencySummary => {
        return {
            id: currency.id,
            name: currency.name,
            symbol: currency.symbol,
            priceUsd: parseFloat(currency.priceUsd),
        };
    };
    const [searchParams] = useSearchParams();

    const currencyId = searchParams.get('id');
    const currencyStatisticsData = useCurrencyStatistics(currencyId);

    return (
        <div className={styles.currency_info}>
            <div className={styles.wrapper}>
                {currencyStatisticsData && (
                    <>
                        <p className={`${styles.info_block} ${styles.currency_name}`}>
                            {currencyStatisticsData.name} ({currencyStatisticsData.symbol})
                        </p>
                        <div className={styles.info_line}>
                            <p className={styles.info_block}>Supply:</p>
                            <p className={styles.info_block}>
                                {formatNumber(parseFloat(currencyStatisticsData.supply))}
                            </p>
                        </div>
                        <div className={styles.info_line}>
                            <p className={styles.info_block}>Price:</p>
                            <p className={styles.info_block}>
                                ${formatNumber(parseFloat(currencyStatisticsData.priceUsd))}
                            </p>
                        </div>
                        <div className={styles.info_line}>
                            <p className={styles.info_block}>Market Cap:</p>
                            <p className={styles.info_block}>
                                {formatNumber(parseFloat(currencyStatisticsData.marketCapUsd))}
                            </p>
                        </div>
                        <div className={styles.info_line}>
                            <p className={styles.info_block}>Volume (24Hr):</p>
                            <p className={styles.info_block}>
                                {formatNumber(parseFloat(currencyStatisticsData.volumeUsd24Hr))}
                            </p>
                        </div>
                        <div className={styles.info_line}>
                            <p className={styles.info_block}>Vwap (24Hr):</p>
                            <p className={styles.info_block}>
                                {formatNumber(parseFloat(currencyStatisticsData.vwap24Hr))}
                            </p>
                        </div>
                        <div className={styles.info_line}>
                            <p className={styles.info_block}>Change (24Hr):</p>
                            <p className={styles.info_block}>
                                {parseFloat(currencyStatisticsData.changePercent24Hr) > 0 ? '+' : ''}
                                {formatNumber(parseFloat(currencyStatisticsData.changePercent24Hr))}%
                            </p>
                        </div>
                        <div className={styles.chart}>
                            <CryptoChart />
                        </div>
                        <div className={styles.buttons_container}>
                            <a href={currencyStatisticsData.explorer}>
                                <button className={styles.explorer_button}>
                                    More Details
                                </button>
                            </a>
                            <AddToPortfolio {...prepareCurrencySummary(currencyStatisticsData)} />
                            <PortfolioModal />
                            <NavLink to={'/'}><button className={styles.adaptive_back_button}> Back </button> </NavLink>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}



export default CurrencyStatistics;
