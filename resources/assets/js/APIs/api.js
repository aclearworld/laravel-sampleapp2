import axios from 'axios';

const getReportsApi = () => {
    return axios.get('/api/reports');
};

export default getReportsApi;