import React from 'react';
import { Modal } from 'antd';

interface AddToPortfolioModalProps {
    visible: boolean;
    onCancel: () => void;
}

const AddToPortfolioModal: React.FC<AddToPortfolioModalProps> = ({ visible, onCancel }) => {

    const handleCancel = () => {
        onCancel();
    };

    return (
        <Modal visible={visible} onCancel={handleCancel}>
            <p>Скоро здесь будет список валют в портфеле и возможностью убрать каждую из них из портфеля</p>
        </Modal>
    );
};

export default AddToPortfolioModal;
