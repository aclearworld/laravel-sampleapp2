import {actionTypes} from "../actions/actionTypes";

const initialState = [];

export const customers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.RECEIVE_CUSTOMERS:
            return action.payload.customers;
        default:
            return state;
    }
};