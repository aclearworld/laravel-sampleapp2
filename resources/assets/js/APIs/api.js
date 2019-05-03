import axios from 'axios';

const getReports = () => {
    return axios.post('/api/reports');
};

export default getReports;