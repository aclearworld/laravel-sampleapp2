import {actionTypes} from "./actionTypes";
import {getReportsApi, getCustomersApi, createNewCustomerApi, getCustomerApi} from '../APIs/api'

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

const receiveCustomer = customer => {
    return {
        type: actionTypes.RECEIVE_CUSTOMER,
        payload: {customer: customer}
    };
};

const failedGetCustomer = errors => {
    return {
        type: actionTypes.FAILED_GET_CUSTOMER,
        payload: {errors: errors}
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

const successUpdateCustomer = () => {
    return {
        type: actionTypes.SUCCESS_UPDATE_CUSTOMER,
    };
};

const failedUpdateCustomer = errors => {
    return {
        type: actionTypes.FAILED_UPDATE_CUSTOMER,
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

export const getCustomer = id => {
    return dispatch => {
        getCustomerApi(id)
            .then(res => {
                console.log(res.data);
                dispatch(receiveCustomer(res.data));
            })
            .catch(err => {
                let errors = {invalidId: ['指定された顧客は存在しません']};
                dispatch(failedGetCustomer(errors));
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

export const updateCustomer = (id, name) => {
    return dispatch => {
        dispatch(startRequest());
        updateCustomer(id, name)
            .then(res => {
                dispatch(successUpdateCustomer());
            })
            .catch(err => {
                if (err.response.status === 404) {
                    let errors = {invalidId: ['指定された顧客は存在しません']};
                    dispatch(failedCreateNewCustomer(errors));
                }
                dispatch(failedUpdateCustomer(err.response.data.errors));
            })
    };
};