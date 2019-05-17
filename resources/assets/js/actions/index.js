import {actionTypes} from "./actionTypes";
import {getReportsApi, getCustomersApi, createNewCustomerApi} from '../APIs/api'

const startRequest = () => {
    return {
        type: actionTypes.WAIT,
    };
};

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

const successCreateNewCustomer = () => {
    return {
        type: actionTypes.SUCCESS_CREATE_NEW_CUSTOMER,
    };
};

const failedCreateNewCustomer = errors => {
    return {
        type: actionTypes.FAILED_CREATE_NEW_CUSTOMER,
        payload: {errors: errors}
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

export const createNewCustomer = name => {
    return dispatch => {
        dispatch(startRequest());
        createNewCustomerApi(name)
            .then(res => {
                dispatch(successCreateNewCustomer());
            })
            .catch(err => {
                dispatch(failedCreateNewCustomer(err.response.data.errors));
            })
    };
};
