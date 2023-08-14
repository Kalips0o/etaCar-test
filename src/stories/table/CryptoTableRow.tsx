import React from 'react';
import { Currency } from '../../types/apiTypes';
import { formatNumber } from '../../utils/formatters';
import { Link } from 'react-router-dom';
import ClientRoutes from '../../config/routes';
import PlusIcon from '../../assets/plusIcon.png';
import styles from './CryptoTableRow.module.scss'

interface CryptoTableRowProps {
    crypto: Currency;
    showModal: (crypto: Currency) => void;
}

function CryptoTableRow({ crypto, showModal }: CryptoTableRowProps) {
    return (
        <tr key={crypto.id} >
            <td>
                <Link key={crypto.id} className={styles.link} to={`${ClientRoutes.CurrencyStatistics}?id=${crypto.id}`}>
                    {crypto.rank}
                </Link>
            </td>
            <td>
                <span className={styles.text_crypto}>
                    <Link key={crypto.id} className={styles.link} to={`${ClientRoutes.CurrencyStatistics}?id=${crypto.id}`}>
                        {crypto.name}
                    </Link>
                </span>
            </td>
            <td>
                <Link key={crypto.id} className={styles.link} to={`${ClientRoutes.CurrencyStatistics}?id=${crypto.id}`}>
                    {crypto.symbol}
                </Link>
            </td>
            <td>
                <Link key={crypto.id} className={styles.link} to={`${ClientRoutes.CurrencyStatistics}?id=${crypto.id}`}>
                    {formatNumber(parseFloat(crypto.marketCapUsd))}
                </Link>
            </td>
            <td >
                <Link key={crypto.id} className={styles.link} to={`${ClientRoutes.CurrencyStatistics}?id=${crypto.id}`}>
                    {formatNumber(parseFloat(crypto.priceUsd))}
                </Link>
            </td>
            <td >
                <Link key={crypto.id} className={styles.link} to={`${ClientRoutes.CurrencyStatistics}?id=${crypto.id}`}>
                    {formatNumber(parseFloat(crypto.supply))}
                </Link>
            </td>
            <td >
                <Link key={crypto.id} className={styles.link} to={`${ClientRoutes.CurrencyStatistics}?id=${crypto.id}`}>
                    {formatNumber(parseFloat(crypto.vwap24Hr))}
                </Link>
            </td>
            <td className={`${styles.Change24Hr} ${parseFloat(crypto.changePercent24Hr) > 0 ? styles.textSuccess : styles.textDanger}`}>
                <Link key={crypto.id} className={styles.link} to={`${ClientRoutes.CurrencyStatistics}?id=${crypto.id}`}>
                    <span style={{ color: parseFloat(crypto.changePercent24Hr) > 0 ? 'green' : 'red' }}>
                        {parseFloat(crypto.changePercent24Hr) > 0 ? '+' : '-'}
                        {formatNumber(Math.abs(parseFloat(crypto.changePercent24Hr)))}
                    </span>
                </Link>
            </td>
            <td>
                <button className={styles.plus_icon} onClick={() => showModal(crypto)}>
                    <img src={PlusIcon} alt='plus icon' />
                </button>
            </td>
        </tr>
    );
}

export default CryptoTableRow;
