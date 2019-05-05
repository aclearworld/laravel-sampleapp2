import {actionTypes} from "./actionTypes";
import getReportsApi from '../APIs/api'

const receiveReports = reports => {
    return {
        type: actionTypes.RECEIVE_REPORTS,
        payload: {reports: reports}
    };
};

export const getReports = () => {
    return dispatch => {
        getReportsApi()
            .then(res => {
                console.log(res);
                dispatch(receiveReports(res.data));
            })
            .catch(err => {
                console.error('caught error', err.stack);
            })
    };
};
