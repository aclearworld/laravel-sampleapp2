import axios from 'axios';

export const getReportsApi = () => {
    return axios.get('/api/reports');
};

export const getCustomersApi = () => {
    return axios.get('/api/customers');
};