import React, { ChangeEvent, useState, useContext } from 'react';
import styles from './CurrencyTableModal.module.scss';
import { PortfolioModalContext } from '../../../context/portfolioModal.context';


interface CurrencyTableModalProps {
    visible: boolean;
    onOk: () => void;
    onCancel: () => void;
}

const CurrencyTableModal: React.FC<CurrencyTableModalProps> = ({ visible, onCancel, onOk }) => {
    const { setLastAddedCurrencyToPortfolio } = useContext(PortfolioModalContext);

    const [inputValue, setInputValue] = useState<string>('');

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (/^\d*\.?\d{0,5}$/.test(newValue) || newValue === '') {
            setInputValue(newValue);
        }
    };

    const handleOk = () => {
        const parsedValue = parseFloat(inputValue);
        if (parsedValue >= 0.00001 && parsedValue <= 1000000) {
            const newCurrency = {
                id: 'unique_id', // Replace with the appropriate ID for your currency
                name: 'New Currency', // Replace with the appropriate name
                symbol: 'NC', // Replace with the appropriate symbol
                priceUsd: parsedValue,
                amount: parsedValue,
            };

            setLastAddedCurrencyToPortfolio(newCurrency);
            onOk();
            setInputValue('');
        } else {
            console.error('Input value is not within the allowed range.');
        }
    };

    const handleCancel = () => {
        onCancel();
        setInputValue('');
    };

    if (!visible) {
        return null;
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2 className={styles.modalTitle}>Add Crypto</h2>
                <input
                    className={styles.input}
                    placeholder='Enter amount of currency...'
                    value={inputValue}
                    onChange={handleInput}
                />
                <div className={styles.modalButtons}>
                    <button className={styles.modalButtonConfirm} onClick={handleOk}>  Confirm </button>
                    <button className={styles.modalButtonCancel} onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default CurrencyTableModal;
