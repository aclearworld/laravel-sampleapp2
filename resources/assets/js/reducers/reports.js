import {actionTypes} from "../actions/actionTypes";

const initialState = [];

export const reports = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.RECEIVE_REPORTS:
            return action.payload.reports;
        default:
            return state;
    }
};