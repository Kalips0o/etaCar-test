import React, { createContext, useState } from 'react';
import { CurrencySummaryWithAmount } from '../components/modals/portfolioModal/portfolioModalRow/PortfolioModalRow';


export interface PortfolioModalContextState {
    shouldShowPortfolioModal: boolean;
    setShouldShowPortfolioModal: React.Dispatch<React.SetStateAction<boolean>>;
    lastAddedCurrencyToPortfolio: CurrencySummaryWithAmount;
    setLastAddedCurrencyToPortfolio: React.Dispatch<React.SetStateAction<CurrencySummaryWithAmount>>;
    currencyPortfolioRows: CurrencySummaryWithAmount[];
    setCurrencyPortfolioRows: React.Dispatch<React.SetStateAction<CurrencySummaryWithAmount[]>>;
    closeModal: () => void;
}

export const initialCurrencyPortfolioRowState = {
    id: '',
    name: '',
    symbol: '',
    priceUsd: 0,
    amount: 0,
};

export const PortfolioModalContext = createContext({} as PortfolioModalContextState);

export const PortfolioModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [shouldShowPortfolioModal, setShouldShowPortfolioModal] = useState<boolean>(false);
    const [
        lastAddedCurrencyToPortfolio,
        setLastAddedCurrencyToPortfolio,
    ] = useState<CurrencySummaryWithAmount>(initialCurrencyPortfolioRowState);
    const [currencyPortfolioRows, setCurrencyPortfolioRows] = useState<CurrencySummaryWithAmount[]>([]);

    const closeModal = () => {
        setShouldShowPortfolioModal(false);
    };

    const value = {
        shouldShowPortfolioModal,
        setShouldShowPortfolioModal,
        lastAddedCurrencyToPortfolio,
        setLastAddedCurrencyToPortfolio,
        currencyPortfolioRows,
        setCurrencyPortfolioRows,
        closeModal,
    };

    return <PortfolioModalContext.Provider value={value}>{children}</PortfolioModalContext.Provider>;
};
