import axios from 'axios';

export const getReportsApi = () => {
    return axios.get('/api/reports');
};

export const getCustomersApi = () => {
    return axios.get('/api/customers');
};

/**
 * 　新規顧客作成API
 * @param name 顧客名
 * @returns {AxiosPromise<any>}
 */
export const createNewCustomerApi = name => {
    return axios.post('/api/customers', {name: name});
};
