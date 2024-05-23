import axios from 'axios';

const API_URL = 'https://restcountries.com/v3.1';

export const fetchAllCountries = async () => {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
};

export const fetchCountryDetails = async (countryCode: string) => {
    const response = await axios.get(`${API_URL}/alpha/${countryCode}`);
    return response.data[0]; // API возвращает массив, берем первый элемент
};