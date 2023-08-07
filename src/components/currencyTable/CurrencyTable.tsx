import React, {useState, useEffect} from "react";
import styles from './CurrencyTable.module.scss';
import {PlusCircleOutlined} from "@ant-design/icons";
import {Button} from "antd";
import axios from 'axios';
import AddToCurrencyModal from "../addToPortfolioModal/AddToCurrencyModal";
import {Currency} from "../../types/apiTypes";
import TablePagination from "../pagination/Pagination";
import {formatNumber} from "../../utils/formatters";


interface ApiResponse {
    data: Currency[]
}

function CurrencyTable() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cryptoData, setCryptoData] = useState<Currency[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;



    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        // Выполняем GET-запрос к API
        axios.get<ApiResponse>('https://api.coincap.io/v2/assets')
            .then(response => {
                // Обновляем состояние с данными из ответа
                setCryptoData(response.data.data);
            })
            .catch(error => {
                console.error('An error occurred:', error);
            });
    }, []); // Пустой массив зависимостей, чтобы запрос выполнился только при монтировании компонента

    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <div className={styles.colMd12}>
                    <table className={styles.cryptoTable}>
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Symbol</th>
                            <th scope="col">Market Cap</th>
                            <th scope="col">Price</th>
                            <th scope="col">Supply</th>
                            <th scope="col">Vol(24h)</th>
                            <th scope="col">%(24h)</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {cryptoData
                            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                            .map((crypto, index) => (
                                <tr key={crypto.id} className={styles.text}>
                                    <td>{crypto.rank}</td>
                                    <td>
                                        <span className={styles.textCrypto}>{crypto.name}</span>
                                    </td>
                                    <td>{crypto.symbol}</td>
                                    <td>{formatNumber(parseFloat(crypto.marketCapUsd))}</td>
                                    <td className={styles.textWarning}>{formatNumber(parseFloat(crypto.priceUsd))}</td>
                                    <td className={styles.textWarning}>{ formatNumber(parseFloat(crypto.supply)) }</td>
                                    <td className={styles.textSuccess}>{formatNumber(parseFloat(crypto.vwap24Hr))}</td>
                                    <td className={styles.textWarning}> {(parseFloat(crypto.changePercent24Hr)) > 0 ? "+" : ""} {formatNumber(parseFloat(crypto.changePercent24Hr))}</td>

                                    <td>
                                        <Button type="text" onClick={showModal}>
                                            <PlusCircleOutlined className={styles.plusIcon}/>
                                        </Button>
                                    </td>
                                    <AddToCurrencyModal isOpen={isModalOpen} onOk={handleOk} onCancel={handleCancel}/>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <TablePagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalItems={cryptoData.length}
                        itemsPerPage={itemsPerPage}
                    />
                </div>
            </div>
        </div>
    );
}

export default CurrencyTable;
