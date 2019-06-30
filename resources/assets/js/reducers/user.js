import {actionTypes} from "../actions/actionTypes";

const initialState = {user: null};

export const user = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SUCCESS_GET_USER:
            return action.payload.user;
        case actionTypes.FAILED_GET_USER:
            return action.payload.anonymousUser;
        default:
            return state;
    }
};