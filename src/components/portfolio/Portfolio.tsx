import React, { useState } from 'react';
import AddToPortfolioModal from './addToPortfolioModal/addToPortfolioModal';

function Portfolio() {
    const [modalVisible, setModalVisible] = useState(false);

    const showModal = () => {
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
    };

    return (
        <div>
            <div onClick={showModal} style={{ cursor: 'pointer' }}>
                Portfolio
            </div>
            <AddToPortfolioModal visible={modalVisible} onCancel={hideModal} />
        </div>
    );
}

export default Portfolio;
