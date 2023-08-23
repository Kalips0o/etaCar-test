import { fetchCryptoData } from './Api';
import { Currency } from '../types/apiTypes';

export async function fetchCurrencies(isTopRanked: boolean = false): Promise<Currency[]> {
    try {
        // Передаем параметры limit и offset
        const data = await fetchCryptoData(10, 0);

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
