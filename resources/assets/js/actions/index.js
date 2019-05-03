import {actionTypes} from "./actionTypes";

export const receiveReports = reports => {
    return {
        type: actionTypes.RECEIVE_REPORTS,
        payload: {reports: reports}
    };
};