import {actionTypes} from "./actionTypes";
import {getReportsApi, getCustomersApi} from '../APIs/api'

const receiveReports = reports => {
    return {
        type: actionTypes.RECEIVE_REPORTS,
        payload: {reports: reports}
    };
};

const receiveCustomers = customers => {
    return {
        type: actionTypes.RECEIVE_CUSTOMERS,
        payload: {customers: customers}
    };
};

export const getReports = () => {
    return dispatch => {
        getReportsApi()
            .then(res => {
                dispatch(receiveReports(res.data));
            })
            .catch(err => {
                console.error('caught error', err.stack);
            })
    };
};

export const getCustomers = () => {
    return dispatch => {
        getCustomersApi()
            .then(res => {
                dispatch(receiveCustomers(res.data));
            })
            .catch(err => {
                console.error('caught error', err.stack);
            })
    };
};
