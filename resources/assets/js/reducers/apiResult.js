import {actionTypes} from "../actions/actionTypes";

const initialState = {
    isProcessing: false,
    hasError: false,
    errors: null,
};

export const apiResult = (state = initialState, action) => {
    switch (action.type) {
        case  actionTypes.WAIT:
            return {...initialState, isProcessing: true};
        case actionTypes.SUCCESS_CREATE_NEW_CUSTOMER:
            return initialState;
        case actionTypes.FAILED_CREATE_NEW_CUSTOMER:
            return {
                ...initialState,
                hasError: true,
                errors: action.payload.errors
            };
        default:
            return state;
    }
};