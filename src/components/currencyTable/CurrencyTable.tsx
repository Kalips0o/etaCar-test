import React, { useState, useEffect, useContext } from 'react';
import styles from './CurrencyTable.module.scss';
import { PlusCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Currency } from '../../types/apiTypes';
import { formatNumber } from '../../utils/formatters';
import { Button } from 'antd';
import Pagination from '../pagination/Pagination';
import { PaginationContext, PaginationContextState } from '../../context/pagination.context';
import AddToCurrencyModal from '../addToCurrencyModal/AddToCurrencyModal';


interface ApiResponse {
    data: Currency[];
}

function CryptoTable() {
    const {
        currentPage,
        setPagination,
        totalPages,
        setTotalPages,
    } = useContext<PaginationContextState>(PaginationContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cryptoData, setCryptoData] = useState<Currency[]>([]);

    const itemsPerPage: number = 5; // Количество элементов на одной странице

    useEffect(() => {
        axios
            .get<ApiResponse>('https://api.coincap.io/v2/assets')
            .then(response => {
                setCryptoData(response.data.data);
                const calculatedTotalPages = Math.ceil(response.data.data.length / itemsPerPage);
                setTotalPages(calculatedTotalPages);
            })
            .catch(error => {
                console.error('An error occurred:', error);
            });
    }, []);

    useEffect((): void => {
        setPagination();
    }, [totalPages, currentPage]);


    const startIndex: number = (currentPage - 1) * itemsPerPage;
    const endIndex: number = startIndex + itemsPerPage;
    const visibleCryptoData: Currency[] = cryptoData.slice(startIndex, endIndex);


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <div className={styles.colMd12}>
                    <table className={styles.cryptoTable}>
                        <thead>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Symbol</th>
                            <th scope='col'>Market Cap</th>
                            <th scope='col'>Price</th>
                            <th scope='col'>Supply</th>
                            <th scope='col'>Volume (24Hr)</th>
                            <th scope='col'>%(24h)</th>
                            <th scope='col'></th>
                        </tr>
                        </thead>
                        <tbody>
                        {visibleCryptoData.map((crypto, index) => (
                            <tr key={crypto.id} className={styles.text}>
                                <td>{crypto.rank}</td>
                                <td>
                                    <span className={styles.textCrypto}>{crypto.name}</span>
                                </td>
                                <td>{crypto.symbol}</td>
                                <td>{formatNumber(parseFloat(crypto.marketCapUsd))}</td>
                                <td className={styles.textWarning}>{formatNumber(parseFloat(crypto.priceUsd))}</td>
                                <td className={styles.textWarning}>{formatNumber(parseFloat(crypto.supply))}</td>
                                <td className={styles.textSuccess}>{formatNumber(parseFloat(crypto.vwap24Hr))}</td>
                                <td className={`${styles.Change24Hr} ${parseFloat(crypto.changePercent24Hr) > 0 ? styles.textSuccess : styles.textDanger}`}>
    <span style={{ color: parseFloat(crypto.changePercent24Hr) > 0 ? 'green' : 'red' }}>
        {parseFloat(crypto.changePercent24Hr) > 0 ? '+' : '-'}
        {formatNumber(Math.abs(parseFloat(crypto.changePercent24Hr)))}
    </span>
                                </td>

                                <td>
                                    <Button type='text' onClick={showModal}>
                                        <PlusCircleOutlined className={styles.plusIcon} />
                                    </Button>
                                </td>
                                <AddToCurrencyModal isOpen={isModalOpen} onOk={handleOk} onCancel={handleCancel} />
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <Pagination />
                </div>
            </div>
        </div>
    );
}

export default CryptoTable;
