import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { formatNumber } from '../../utils/formatters';
import styles from './CurrencyStatistics.module.scss';
import { StatsContext, StatsContextState } from '../../context/stats.context';
import { CurrencySummary } from '../modals/portfolioModalRow/PortfolioModalRow';
import { Currency } from '../../types/apiTypes';
import CryptoChart from '../сryptoСhart/СryptoСhart';
import PortfolioModal from '../modals/portfolioModal/PortfolioModal';
import { api } from '../../api/Api';
import AddToPortfolio from '../portfolio/AddToPortfolio';


function CurrencyStatistics() {
    const { setErrorMessage, setShouldShowStats } = useContext<StatsContextState>(StatsContext);
    const [currencyStatisticsData, setCurrencyStatisticsData] = useState<Currency>();
    const [searchParams] = useSearchParams();

    const prepareCurrencySummary = (currency: Currency): CurrencySummary => {
        return {
            id: currency.id,
            name: currency.name,
            symbol: currency.symbol,
            priceUsd: parseFloat(currency.priceUsd),
        };
    };

    useEffect((): void => {

        axios.get(`${api}assets`, {
            params: {
                ids: searchParams.get('id'),
            },
        }).then(res => {
            setCurrencyStatisticsData(res.data.data[0]);
        }).catch(err => {
            setErrorMessage(err);
            setShouldShowStats(true);
        });
    }, [searchParams]);

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
