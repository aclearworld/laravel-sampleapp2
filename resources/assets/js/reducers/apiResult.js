import {actionTypes} from "../actions/actionTypes";

const initialState = {
    isProcessing: false,
    hasError: false,
    errors: null,
    errorTitle: '',
    errorType: null,
};

export const apiResult = (state = initialState, action) => {
    switch (action.type) {
        case  actionTypes.WAIT:
            return {...initialState, isProcessing: true};
        case actionTypes.SUCCESS_CREATE_NEW_CUSTOMER:
        case  actionTypes.SUCCESS_UPDATE_CUSTOMER:
            return initialState;
        case actionTypes.FAILED_CREATE_NEW_CUSTOMER:
        case actionTypes.FAILED_UPDATE_CUSTOMER:
        case actionTypes.FAILED_GET_CUSTOMER:
            return {
                ...initialState,
                hasError: true,
                errors: action.payload.errors,
                errorTitle: action.payload.errorTitle,
                errorType: action.payload.errorType,
            };
        default:
            return state;
    }
};