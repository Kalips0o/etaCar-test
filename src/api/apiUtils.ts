import { Currency } from '../types/apiTypes';
import { fetchCryptoData } from './Api';


export async function fetchTopRankedCurrencies(): Promise<Currency[]> {
    try {
        const data = await fetchCryptoData();
        const topThreeCurrencies = data.data.slice(0, 3);
        return topThreeCurrencies;
    } catch (error) {
        console.error('An error occurred:', error);
        return [];
    }
}


export async function fetchCryptoTableData(): Promise<Currency[]> {
    try {
        const data = await fetchCryptoData();
        return data.data;
    } catch (error) {
        console.error('An error occurred:', error);
        return [];
    }
}
