import { fetchCryptoData } from './Api';
import { Currency } from '../types/apiTypes';

export async function fetchCurrencies(isTopRanked: boolean = false, limit: number = 10, offset: number = 0): Promise<Currency[]> {
    try {
        const data = await fetchCryptoData({ limit, offset });

        if (isTopRanked) {
            return data.data.slice(0, 3);
        } else {
            return data.data;
        }
    } catch (error) {
        console.error('An error occurred:', error);
        return [];
    }
}
