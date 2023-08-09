import React, { useState, useEffect } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Currency } from '../../types/apiTypes';
import { formatNumber } from '../../utils/formatters';
import { Button } from 'antd';
import Pagination from '../pagination/Pagination';
import CurrencyTableModal from '../modals/addToCurrencyModal/CurrencyTableModal';
import { baseUrl } from '../../api/baseUrl';
import styles from './CurrencyTable.module.scss';


interface ApiResponse {
    data: Currency[];
}

function CryptoTable() {
    const [cryptoData, setCryptoData] = useState<Currency[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCrypto, setSelectedCrypto] = useState<Currency | null>(null);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const itemsPerPage: number = 5;

    useEffect(() => {
        axios
            .get<ApiResponse>(`${baseUrl}assets`)
            .then(response => {
                setCryptoData(response.data.data);
                const calculatedTotalPages = Math.ceil(response.data.data.length / itemsPerPage);
                setTotalPages(calculatedTotalPages);
            })
            .catch(error => {
                console.error('An error occurred:', error);
            });
    }, []);

    const handlePrevPaginationTabClick = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPaginationTabClick = () => {
        if (currentPage !== totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const startIndex: number = (currentPage - 1) * itemsPerPage;
    const endIndex: number = startIndex + itemsPerPage;
    const visibleCryptoData: Currency[] = cryptoData.slice(startIndex, endIndex);

    const handleModalOk = () => {
        setIsModalOpen(false);
    };

    const handleModalCancel = () => {
        setIsModalOpen(false);
    };

    const showModal = (crypto: Currency) => {
        setSelectedCrypto(crypto);
        setIsModalOpen(true);
    };

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

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
                            <th scope='col' />
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
                                        <span
                                            style={{ color: parseFloat(crypto.changePercent24Hr) > 0 ? 'green' : 'red' }}>
                                            {parseFloat(crypto.changePercent24Hr) > 0 ? '+' : '-'}
                                            {formatNumber(Math.abs(parseFloat(crypto.changePercent24Hr)))}
                                        </span>
                                </td>
                                <td>
                                    <Button type='text' onClick={() => showModal(crypto)}>
                                        <PlusCircleOutlined className={styles.plusIcon} />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        pageNumbers={pageNumbers}
                        handlePrevPaginationTabClick={handlePrevPaginationTabClick}
                        handleNextPaginationTabClick={handleNextPaginationTabClick}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>
            <CurrencyTableModal
                visible={isModalOpen}
                onCancel={handleModalCancel}
                onOk={handleModalOk}
                selectedCrypto={selectedCrypto}
            />
        </div>
    );
}

export default CryptoTable;
