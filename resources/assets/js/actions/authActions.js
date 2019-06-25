import {getUserApi, loginApi, logoutApi} from '../APIs/api'
import {actionTypes} from "./actionTypes";
import axios from "axios";

//auth関連のアクション
const successLogin = () => {
    return {
        type: actionTypes.LOGIN,
    };
};
const successLogout = () => {
    return {
        type: actionTypes.LOGOUT,
    };
};
const successGetUser = user => {
    console.log('ユーザ情報を取得しました');
    console.log(`id:${user.id}`);
    console.log(`id:${user.name}`);
    console.log(`id:${user.email}`);
    console.log(`id:${user.created_at}`);
    return {
        type: actionTypes.SUCCESS_GET_USER,
        payload: user,
    };
};

export const login = () => {
    return dispatch => {
        loginApi()
            .then(res => {
                const token = res.data.access_token;
                console.log(token);
                console.log('ログインしました');
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                dispatch(successLogin());
            })
            .catch(err => {
                console.error('caught error', err.stack);
            })
    };
};

export const logout = () => {
    return dispatch => {
        logoutApi()
            .then(res => {
                axios.defaults.headers.common['Authorization'] = '';
                console.log('ログアウトしました');
                dispatch(successLogout());
            })
            .catch(err => {
                console.error(err.error);
                console.error('caught error', err.stack);
            })
    };
};

export const getUser = () => {
    console.log(axios.defaults.headers.common);
    return dispatch => {
        getUserApi()
            .then(res => {
                dispatch(successGetUser(res.data));
            })
            .catch(err => {
                console.error('caught error', err.stack);
            })
    };
};