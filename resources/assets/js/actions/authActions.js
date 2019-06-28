import {getUserApi, loginApi, logoutApi} from '../APIs/api'
import {actionTypes} from "./actionTypes";
import axios from "axios";
import jsCookie from 'js-cookie';
import {AuthorizationTokenCookieName} from "../consts";

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
                console.log('ログインしました');
                console.log(token);
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                //クッキーに1日間セット
                jsCookie.set(AuthorizationTokenCookieName, token, {expires: 1});

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
                jsCookie.remove(AuthorizationTokenCookieName);
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