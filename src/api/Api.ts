import axios from 'axios';
import { SetStateAction } from 'react';
import { Currency } from '../types/apiTypes';

export const api = 'https://api.coincap.io/v2/';
const assetsEndpoint = 'assets';

export const fetchCryptoData = async ({ limit, offset }: { limit: number; offset: number }) => {
    try {
        const response = await axios.get(`${api}${assetsEndpoint}`, {
            params: {
                limit:10,
                offset,
            },
        });
        return response.data;
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
};

export const fetchCryptoStats = async (id: string | null, interval: string, start: number, end: number) => {
    try {
        const response = await axios.get(`${api}${assetsEndpoint}/${id}/history`, {
            params: {
                interval,
                start,
                end,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
};

export function fetchDataAndUpdateState(ids: any[], setCurrentCurrencyData: { (value: SetStateAction<Currency[]>): void; (arg0: any): void; }) {
    axios.get(`${api}${assetsEndpoint}`, {
        params: {
            ids: ids.join(','),
        },
    }).then(res => {
        setCurrentCurrencyData(res.data.data);
    }).catch(err => {
    });
}

export async function fetchCurrencyData(id: unknown) {
    try {
        const response = await axios.get(`${api}${assetsEndpoint}`, {
            params: {
                ids: id,
            },
        });
        return response.data.data[0];
    } catch (error) {
        throw error;
    }
}
//
// export const fetchPagination = async (limit: number, offset: number) => {
//     try {
//         const response = await axios.get(`${api}${assetsEndpoint}?limit=${limit}&offset=${offset}`);
//         return response.data;
//     } catch (error) {
//         console.error('An error occurred:', error);
//         throw error;
//     }
// };
