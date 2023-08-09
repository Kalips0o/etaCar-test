import React, { useContext, useState } from 'react';
import styles from './Portfolio.module.scss';
import { CurrencySummary } from '../modals/portfolioModalRow/PortfolioModalRow';
import { PlusCircleOutlined } from '@ant-design/icons';
import CurrencyTableModal from '../modals/addToCurrencyModal/CurrencyTableModal';
import { AddToPortfolioModalContext, AddToPortfolioModalContextState } from '../../context/addToPortfolioModal.context';


function AddToPortfolio(AddToPortfolioProps:CurrencySummary ) {

    const {
        setShouldShowAddToPortfolioModal,
        setCurrencyToAddToPortfolio,
    } = useContext<AddToPortfolioModalContextState>(AddToPortfolioModalContext);

    const [modalVisible, setModalVisible] = useState(false);

    const openAddToPortfolioModal = (): void => {
        setShouldShowAddToPortfolioModal(true);
        setCurrencyToAddToPortfolio({ ...AddToPortfolioProps });
        setModalVisible(true);
    };

    const closeModal = () => {
        setShouldShowAddToPortfolioModal(false);
        setModalVisible(false);
    };


    return (
        <div className={styles.plus_icon_container}>
            <PlusCircleOutlined className={styles.plusIcon} onClick={openAddToPortfolioModal} />
            <CurrencyTableModal
                visible={modalVisible}
                onCancel={closeModal}
                onOk={closeModal}
                // @ts-ignore
                selectedCrypto={AddToPortfolioProps}
            />
        </div>
    );
}

export default AddToPortfolio;
