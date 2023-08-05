import React from 'react';

interface PortfolioProps {
    amount: string;
}

const Portfolio: React.FC<PortfolioProps> = ({ amount }) => {
    return (
        <div>Portfolio</div>
    );
};

export default Portfolio;
