import React, { useContext } from 'react';
import PortfolioModalRow from '../portfolioModalRow/PortfolioModalRow';
import styles from './PortfolioModal.module.scss';
import { PortfolioModalContext, PortfolioModalContextState } from '../../../context/portfolioModal.context';

function PortfolioModal() {
    const {
        shouldShowPortfolioModal,
        setShouldShowPortfolioModal,
        currencyPortfolioRows,
    } = useContext<PortfolioModalContextState>(PortfolioModalContext);

    const preparedModalClassName =
        `${styles.modal} ${shouldShowPortfolioModal
            ? styles.show : styles.do_not_show}`;

    return (
        <div className={preparedModalClassName}>
            <div className={styles.modal_content}>
                <div className={styles.portfolio_rows}>
                    {currencyPortfolioRows.length
                        ? currencyPortfolioRows.map((currencyPortfolioRow, index) => {
                            return <PortfolioModalRow key={index} {...currencyPortfolioRow} />;
                        })
                        : <div className={styles.empty_portfolio}>Portfolio is Empty</div>
                    }
                </div>
                <button className={styles.cancel_button} onClick={() => setShouldShowPortfolioModal(false)}>Cancel
                </button>
            </div>
        </div>
    );
}

export default PortfolioModal;
