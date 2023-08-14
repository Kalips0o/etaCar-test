import { useEffect, useState } from 'react';
import { Currency } from '../types/apiTypes';
import { fetchCryptoTableData, fetchTopRankedCurrencies } from '../api/apiUtils';
import { fetchCurrencyData } from '../api/Api';


export function useTopRankedCurrencies() {
    const [topRankedCurrencyData, setTopRankedCurrencyData] = useState<Currency[]>([]);

    useEffect(() => {
        async function fetchData() {
            const currencies = await fetchTopRankedCurrencies();
            setTopRankedCurrencyData(currencies);
        }

        fetchData();
    }, []);

    return topRankedCurrencyData;
}


export function useCryptoTableData() {
    const [cryptoData, setCryptoData] = useState<Currency[]>([]);

    useEffect(() => {
        async function fetchData() {
            const data = await fetchCryptoTableData();
            setCryptoData(data);
        }

        fetchData();
    }, []);

    return cryptoData;
}

export function useCurrencyStatistics(id: string | null) {
    const [currencyStatisticsData, setCurrencyStatisticsData] = useState<Currency | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                if (id) {
                    const data = await fetchCurrencyData(id);
                    setCurrencyStatisticsData(data);
                }
            } catch (error) {
            }
        }

        fetchData();
    }, [id]);

    return currencyStatisticsData;
}
