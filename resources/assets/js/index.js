import React from 'react';
import ReactDOM from 'react-dom';
import Application from './Application';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import rootReducer from "./reducers/index";
import jsCookie from 'js-cookie';
import {AuthorizationHeaderName, AuthorizationTokenCookieName} from "./consts";
import './index.css'
import axios from "axios";

//twitter認証のためにやむを得ず実装 起動時にurlが /login/twitter/callback であれば、強制的に書き換える
if (window.location.pathname === '/login/twitter/callback') {
    const heads = document.head.children;
    let token = '';
    for (let i = 0; i < heads.length; i++) {
        const name = heads[i].getAttribute('name');
        if (name === 'AuthorizationToken') {
            token = heads[i].getAttribute('content');
        }
    }

    jsCookie.set(AuthorizationTokenCookieName, token, {expires: 365});
    window.location = '/';
}

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