import axios from 'axios';

export const api = 'https://api.coincap.io/v2/';
const assetsEndpoint = 'assets';

export const fetchCryptoData = async () => {
    try {
        const response = await axios.get(`${api}${assetsEndpoint}`);
        return response.data;

    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
};


export const fetchCryptoStats = async (id , interval, start, end) => {
    try {
        const response = await axios.get(`${api}assets/${id}/history`, {
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

export function fetchDataAndUpdateState(ids, setCurrentCurrencyData) {
    axios.get('https://api.coincap.io/v2/assets', {
        params: {
            ids: ids.join(','),
        },
    }).then(res => {
        setCurrentCurrencyData(res.data.data);
    }).catch(err => {
        // Обработка ошибок, если необходимо
    });
}
