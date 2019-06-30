import React from 'react';
import ReactDOM from 'react-dom';
import Application from './Application';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import rootReducer from "./reducers/index";
import jsCookie from 'js-cookie';
import {AuthorizationHeaderName, AuthorizationTokenCookieName, AuthUrlParamName} from "./consts";
import './index.css'
import axios from "axios";

//twitter認証のためにやむを得ず実装
// urlパラムにAuthTokenがあれば、クッキ－にセット
const urlParamtoken = getParameterByName(AuthUrlParamName);
if (urlParamtoken) jsCookie.set(AuthorizationTokenCookieName, urlParamtoken, {expires: 365});

//クッキーにjwtトークンが格納されていればaxiosのヘッダーにセット
const token = jsCookie.get(AuthorizationTokenCookieName);
console.log(' クッキ－　jwt token is ' + token);
if (token) {
    console.log('ログイン済みです');
    axios.defaults.headers.common[AuthorizationHeaderName] = 'Bearer ' + token;
}

const middleWares = [thunk];
const store = createStore(rootReducer, applyMiddleware(...middleWares));

if (document.getElementById('root')) {
    ReactDOM.render(
        <Provider store={store}>
            <Application/>
        </Provider>,
        document.getElementById('root'));
}


/**
 *  urlパラム取得
 * @param name string urlパラム名
 * @returns {string|null} value
 */
function getParameterByName(name) {
    const url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}