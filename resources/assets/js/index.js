import React from 'react';
import ReactDOM from 'react-dom';
import Application from './Application';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import rootReducer from "./reducers/index";
import jsCookie from 'js-cookie';
import './index.css'
import {AuthorizationTokenCookieName} from "./consts";
import axios from "axios";

//クッキーにjwtトークンが格納されていればaxiosのヘッダーにセット
const token = jsCookie.get(AuthorizationTokenCookieName);
if (token) axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

const middleWares = [thunk];
const store = createStore(rootReducer, applyMiddleware(...middleWares));

if (document.getElementById('root')) {
    ReactDOM.render(
        <Provider store={store}>
            <Application/>
        </Provider>,
        document.getElementById('root'));
}