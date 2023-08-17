import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCurrencyStatistics } from '../../hooks/hooks';

import Loader from '../../stories/loader/Loader';
import CurrencyInfo from '../../components/currencyInfo/CurrencyInfo';

function CurrencyStatistics() {
    const [searchParams] = useSearchParams();
    const currencyId = searchParams.get('id');
    const currencyStatisticsData = useCurrencyStatistics(currencyId);

    if (!currencyStatisticsData) {
        return <Loader />;
    }
    return (
        <CurrencyInfo currencyStatisticsData={currencyStatisticsData} />
    );
}

export default CurrencyStatistics;
