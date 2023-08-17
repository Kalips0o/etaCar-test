import React from 'react';
import CryptoChart from '../сryptoСhart/СryptoСhart';
import { NavLink } from 'react-router-dom';
import styles from './CurrencyInfo.module.scss';
import { formatNumber } from '../../utils/formatters';
import AddToPortfolio from '../../stories/portfolio/AddToPortfolio';
import PortfolioModal from '../modals/portfolioModal/PortfolioModal';

export interface CurrencyStatisticsData {
    id:string
    name: string;
    symbol: string;
    supply: string;
    priceUsd: string;
    marketCapUsd: string;
    volumeUsd24Hr: string;
    vwap24Hr: string;
    changePercent24Hr: string;
    explorer: string;
}
function CurrencyInfo({ currencyStatisticsData }: { currencyStatisticsData: CurrencyStatisticsData }) {
    const currencySummary = React.useMemo(() => {
        if (!currencyStatisticsData) return null;
        const { id, name, symbol, priceUsd } = currencyStatisticsData;
        return { id, name, symbol, priceUsd: parseFloat(priceUsd) };
    }, [currencyStatisticsData]);

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
                            {currencySummary && <AddToPortfolio {...currencySummary} />}
                            <PortfolioModal />
                            <NavLink to={'/'}>
                                <button className={styles.adaptive_back_button}> Back </button>
                            </NavLink>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default CurrencyInfo;
