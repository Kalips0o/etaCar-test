import React from 'react';
import { Currency } from '../../types/apiTypes';
import { formatNumber } from '../../utils/formatters';
import { Link } from 'react-router-dom';
import ClientRoutes from '../../config/routes';
import PlusIcon from '../../assets/plusIcon.png';
import styles from './CryptoTableRow.module.scss';

interface TableCellLinkProps {
    to: string;
    children: React.ReactNode;
}

const TableCellLink: React.FC<TableCellLinkProps> = ({ to, children }) => (
    <Link className={styles.link} to={to}>
        {children}
    </Link>
);

interface CryptoTableRowProps {
    crypto: Currency;
    showModal: (crypto: Currency) => void;
}

function CryptoTableRow({ crypto, showModal }: CryptoTableRowProps) {
    const isPositiveChange = parseFloat(crypto.changePercent24Hr) > 0;
    const changeClass = isPositiveChange ? styles.textSuccess : styles.textDanger;
    const changeColor = isPositiveChange ? 'green' : 'red';

    return (
        <tr>
            <td><TableCellLink to={`${ClientRoutes.CurrencyStatistics}?id=${crypto.id}`}>{crypto.rank}</TableCellLink></td>
            <td><span className={styles.text_crypto}><TableCellLink to={`${ClientRoutes.CurrencyStatistics}?id=${crypto.id}`}>{crypto.name}</TableCellLink></span></td>
            <td><TableCellLink to={`${ClientRoutes.CurrencyStatistics}?id=${crypto.id}`}>{crypto.symbol}</TableCellLink></td>
            <td><TableCellLink to={`${ClientRoutes.CurrencyStatistics}?id=${crypto.id}`}>{formatNumber(parseFloat(crypto.marketCapUsd))}</TableCellLink></td>
            <td><TableCellLink to={`${ClientRoutes.CurrencyStatistics}?id=${crypto.id}`}>{formatNumber(parseFloat(crypto.priceUsd))}</TableCellLink></td>
            <td><TableCellLink to={`${ClientRoutes.CurrencyStatistics}?id=${crypto.id}`}>{formatNumber(parseFloat(crypto.supply))}</TableCellLink></td>
            <td><TableCellLink to={`${ClientRoutes.CurrencyStatistics}?id=${crypto.id}`}>{formatNumber(parseFloat(crypto.vwap24Hr))}</TableCellLink></td>
            <td className={`${styles.Change24Hr} ${changeClass}`}>
                <TableCellLink to={`${ClientRoutes.CurrencyStatistics}?id=${crypto.id}`}>
                    <span style={{ color: changeColor }}>
                        {isPositiveChange ? '+' : '-'}
                        {formatNumber(Math.abs(parseFloat(crypto.changePercent24Hr)))}
                    </span>
                </TableCellLink>
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
