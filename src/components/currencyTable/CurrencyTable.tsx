import React, { useState, useEffect } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Currency } from '../../types/apiTypes';
import { formatNumber } from '../../utils/formatters';
import { Button } from 'antd';
import Pagination from '../pagination/Pagination';
import CurrencyTableModal from '../modals/addToCurrencyModal/CurrencyTableModal';
import styles from './CurrencyTable.module.scss';
import { fetchCryptoData } from '../../api/Api';
import { Link } from 'react-router-dom';
import ClientRoutes from '../../config/routes';


function CryptoTable() {
    const [cryptoData, setCryptoData] = useState<Currency[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCrypto, setSelectedCrypto] = useState<Currency | null>(null);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const itemsPerPage: number = 5;

    useEffect(() => {
        fetchCryptoData()
            .then(data => {
                setCryptoData(data.data);
                const calculatedTotalPages = Math.ceil(data.data.length / itemsPerPage);
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

            <div className={styles.row}>

                    <table className={styles.cryptoTable}>
                        <thead>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Name </th>
                            <th scope='col'>Symbol</th>
                            <th scope='col'>Market Cap</th>
                            <th scope='col'>Price </th>
                            <th scope='col'>Supply </th>
                            <th scope='col'>Volume (24Hr)</th>
                            <th scope='col'>%(24h) </th>
                            <th scope='col' />
                        </tr>
                        </thead>
                        <tbody>
                        {visibleCryptoData.map((crypto) => (
                            <tr key={crypto.id} className={styles.text}>
                                <td><Link key={crypto.id} className={styles.link}
                                          to={`${ClientRoutes.CurrencyStatistics}?id=${crypto.id}`}> {crypto.rank}</Link>
                                </td>


                                <td>
                                    <span className={styles.textCrypto}>
                                        <Link key={crypto.id} className={styles.link}
                                              to={`${ClientRoutes.CurrencyStatistics}?id=${crypto.id}`}>
                                        {crypto.name}</Link>
                                    </span>
                                </td>

                                <td>
                                    <Link key={crypto.id} className={styles.link}
                                          to={`${ClientRoutes.CurrencyStatistics}?id=${crypto.id}`}>
                                        {crypto.symbol}
                                    </Link>
                                </td>

                                <td>
                                    <Link key={crypto.id} className={styles.link}
                                          to={`${ClientRoutes.CurrencyStatistics}?id=${crypto.id}`}>
                                        {formatNumber(parseFloat(crypto.marketCapUsd))}
                                    </Link>
                                </td>

                                <td className={styles.textWarning}>
                                    <Link key={crypto.id} className={styles.link}
                                          to={`${ClientRoutes.CurrencyStatistics}?id=${crypto.id}`}>
                                        {formatNumber(parseFloat(crypto.priceUsd))}
                                    </Link>
                                </td>
                                <td className={styles.textWarning}>
                                    <Link key={crypto.id} className={styles.link}
                                          to={`${ClientRoutes.CurrencyStatistics}?id=${crypto.id}`}>
                                        {formatNumber(parseFloat(crypto.supply))}
                                    </Link>
                                </td>

                                <td className={styles.textSuccess}>
                                    <Link key={crypto.id} className={styles.link}
                                          to={`${ClientRoutes.CurrencyStatistics}?id=${crypto.id}`}>
                                        {formatNumber(parseFloat(crypto.vwap24Hr))}
                                    </Link>
                                </td>

                                <td className={`${styles.Change24Hr} ${parseFloat(crypto.changePercent24Hr) > 0 ? styles.textSuccess : styles.textDanger}`}>
                                    <Link key={crypto.id} className={styles.link}
                                          to={`${ClientRoutes.CurrencyStatistics}?id=${crypto.id}`}>
                                        <span
                                            style={{ color: parseFloat(crypto.changePercent24Hr) > 0 ? 'green' : 'red' }}>
                                            {parseFloat(crypto.changePercent24Hr) > 0 ? '+' : '-'}
                                            {formatNumber(Math.abs(parseFloat(crypto.changePercent24Hr)))}
                                        </span>
                                    </Link>
                                </td>
                                <td>
                                    <Button type='text' onClick={() => showModal(crypto)}>
                                        <PlusCircleOutlined className={styles.plus_icon} />
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
