import React, { ChangeEvent, useState } from 'react';
import styles from './CurrencyTableModal.module.scss';

interface CurrencyTableModalProps {
    visible: boolean;
    onOk: () => void;
    onCancel: () => void;
}

const CurrencyTableModal: React.FC<CurrencyTableModalProps> = ({ visible, onCancel, onOk }) => {
    const [inputValue, setInputValue] = useState<string>('');

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (/^\d*\.?\d{0,5}$/.test(newValue) || newValue === '') {
            setInputValue(newValue);
        }
    };

    const handleOk = () => {
        if (parseFloat(inputValue) >= 0.00001 && parseFloat(inputValue) <= 1000000) {
            console.log('Input value:', inputValue);
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
                    <button className={styles.modalButton} onClick={handleOk}>  Confirm </button>
                    <button className={styles.modalButton} onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default CurrencyTableModal;
