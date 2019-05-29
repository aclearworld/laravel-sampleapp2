import axios from 'axios';

export const getReportsApi = () => {
    return axios.get('/api/reports');
};

export const getCustomersApi = () => {
    return axios.get('/api/customers');
};

/**
 * idに紐づく顧客を取得
 * @param id 顧客id
 * @returns {AxiosPromise<any>}
 */
export const getCustomerApi = id => {
    return axios.get(`/api/customers/${id}`);
};

/**
 * 　新規顧客作成API
 * @param name 顧客名
 * @returns {AxiosPromise<any>}
 */
export const createNewCustomerApi = name => {
    return axios.post('/api/customers', {name: name});
};

/**
 * 　顧客名更新API
 * @param name 顧客名
 * @param id 顧客id
 * @returns {AxiosPromise<any>}
 */
export const updateCustomerApi = ( id ,name ) => {
    return axios.post(`/api/customers${id}`, {name: name});
};
