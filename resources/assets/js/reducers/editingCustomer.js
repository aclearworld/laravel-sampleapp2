import {actionTypes} from "../actions/actionTypes";

const initialState = {};

export const editingCustomer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.RECEIVE_CUSTOMER:
            return action.payload.customer;
        default:
            return state;
    }
};