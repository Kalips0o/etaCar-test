import React from 'react';
import { Currency } from '../../types/apiTypes';
import { formatNumber } from '../../utils/formatters';
import styles from './CurrencyTable.module.scss';
import { Link } from 'react-router-dom';
import ClientRoutes from '../../config/routes';
import PlusIcon from './../../assets/plusIcon.png';

interface CryptoTableRowProps {
    crypto: Currency;
    showModal: (crypto: Currency) => void;
}

function CryptoTableRow({ crypto, showModal }: CryptoTableRowProps) {
    return (
        <tr key={crypto.id} className={styles.text}>
            <td>
                <Link key={crypto.id} className={styles.link} to={`${ClientRoutes.CurrencyStatistics}?id=${crypto.id}`}>
                    {crypto.rank}
                </Link>
            </td>
            <td>
                <span className={styles.textCrypto}>
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
            <td className={styles.textWarning}>
                <Link key={crypto.id} className={styles.link} to={`${ClientRoutes.CurrencyStatistics}?id=${crypto.id}`}>
                    {formatNumber(parseFloat(crypto.priceUsd))}
                </Link>
            </td>
            <td className={styles.textWarning}>
                <Link key={crypto.id} className={styles.link} to={`${ClientRoutes.CurrencyStatistics}?id=${crypto.id}`}>
                    {formatNumber(parseFloat(crypto.supply))}
                </Link>
            </td>
            <td className={styles.textSuccess}>
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
