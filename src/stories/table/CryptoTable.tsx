import React, { useState, useEffect } from 'react';
import Pagination from '../../components/pagination/Pagination';
import CryptoTableRow from './CryptoTableRow';
import styles from './CurrencyTable.module.scss';
import CurrencyTableModal from '../../components/modals/currencyModal/CurrencyTableModal';
import { Currency } from '../../types/apiTypes';
import { fetchCryptoData } from '../../api/Api';

function CryptoTable() {
    const [cryptoData, setCryptoData] = useState<Currency[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCrypto, setSelectedCrypto] = useState<Currency | null>(null);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const itemsPerPage: number = 5;

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchCryptoData();
                setCryptoData(data.data);
                const calculatedTotalPages = Math.ceil(data.data.length / itemsPerPage);
                setTotalPages(calculatedTotalPages);
            } catch (error) {
                console.error('An error occurred:', error);
            }
        }

        fetchData();
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
            <table className={styles.crypto_table}>
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
                {visibleCryptoData.map((crypto) => (
                    <CryptoTableRow key={crypto.id} crypto={crypto} showModal={showModal} />
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
