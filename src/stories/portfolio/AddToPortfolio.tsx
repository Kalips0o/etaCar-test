import React, { useContext, useState } from 'react';
import { CurrencySummary } from '../../components/modals/portfolioModal/portfolioModalRow/PortfolioModalRow';
import CurrencyTableModal from '../../components/modals/currencyModal/CurrencyTableModal';
import { AddToPortfolioModalContext, AddToPortfolioModalContextState } from '../../context/addToPortfolioModal.context';
import PlusIcon from '../../assets/plusIcon.png';
import styles from './Portfolio.module.scss';

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
            <button className={styles.plus_icon} onClick={openAddToPortfolioModal} >
                <img   src={PlusIcon}  alt='plus icon'/>
            </button>
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
