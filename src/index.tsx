import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { PaginationProvider } from './context/pagination.context';
import { PortfolioModalProvider } from './context/portfolioModal.context';
import { AddToPortfolioModalProvider } from './context/addToPortfolioModal.context';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);
root.render(
    <BrowserRouter>

        <PortfolioModalProvider>
            <AddToPortfolioModalProvider>
                <App />
            </AddToPortfolioModalProvider>
        </PortfolioModalProvider>

    </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
