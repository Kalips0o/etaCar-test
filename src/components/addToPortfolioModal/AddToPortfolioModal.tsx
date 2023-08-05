import React, {useState} from 'react';
import {Button, Input, Modal} from 'antd';
import styles from './AddToPortfolioModal.module.scss';

interface AddToPortfolioModalProps {
    isOpen: boolean;
    onOk: () => void;
    onCancel: () => void;
}

const AddToPortfolioModal: React.FC<AddToPortfolioModalProps> = ({isOpen, onOk, onCancel}) => {
    const [amount, setAmount] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        // Проверка на валидность ввода: только цифры и десятичные точки
        if (/^\d*\.?\d*$/.test(inputValue)) {
            setAmount(inputValue);
        }
    };
    return (
        <Modal
            className={styles.modalWindow}
            visible={isOpen}
            closable={false}
            centered
            width={300}
            footer={null}
        >
            <Input className={styles.inputAmountOfCurrency} placeholder="Enter amount of currency"
                   onChange={handleInputChange}/>
            <div style={{textAlign: 'center', marginTop: '20px'}}>
                <Button className="ant-btn ant-btn-primary" onClick={onOk}>
                    Confirm
                </Button>
                <Button className="ant-btn" onClick={onCancel} style={{marginLeft: '10px'}}>
                    Cancel
                </Button>
            </div>
        </Modal>
    );
};

export default AddToPortfolioModal;
