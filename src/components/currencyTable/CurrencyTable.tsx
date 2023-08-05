import React, {useState} from "react";
import styles from './CurrencyTable.module.scss';
import {PlusCircleOutlined} from "@ant-design/icons";
import {Button} from "antd";
import AddToPortfolioModal from "../addToPortfolioModal/AddToPortfolioModal";

function CurrencyTable() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleAmountConfirmed = (amount: string) => {
        // Здесь можно выполнить действия с подтвержденным значением amount
        console.log("Confirmed amount:", amount);
    };
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
                            <th scope="col"> </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className={styles.text}>
                            <td>1</td>
                            <td><img
                                src="https://cdn4.iconfinder.com/data/icons/crypto-currency-and-coin-2/256/bitcoincash_bch_bitcoin-128.png"/><span
                                className={styles.textCrypto}> Bitcoin</span></td>
                            <td>BTC</td>
                            <td>$134.655,333</td>
                            <td className={styles.textWarning}>$768.655</td>
                            <td className={styles.textWarning}>$122.998</td>
                            <td className={styles.textWarning}>$5.443.233,600</td>
                            <td className={styles.textSuccess}>%5.54</td>
                            <Button type="text" onClick={showModal}>
                                <PlusCircleOutlined className={styles.plusIcon} />
                            </Button>
                            <AddToPortfolioModal isOpen={isModalOpen} onOk={handleOk} onCancel={handleCancel} />
                        </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default CurrencyTable;
