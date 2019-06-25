import {actionTypes} from "../actions/actionTypes";

const initialState = {isLogin: false};

export const auth = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN:
            return {isLogin: true};
        case actionTypes.LOGOUT:
            return initialState;
        default:
            return state;
    }
};