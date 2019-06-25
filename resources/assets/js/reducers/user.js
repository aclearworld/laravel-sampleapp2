import {actionTypes} from "../actions/actionTypes";

const initialState = {user: null};

export const user = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SUCCESS_GET_USER:
            return {user: action.payload.user};
        default:
            return state;
    }
};