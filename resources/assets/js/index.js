import React from 'react';
import ReactDOM from 'react-dom';
import Application from './Application';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import rootReducer from "./reducers/index";

import './index.css'

const middleWares = [thunk];
const store = createStore(rootReducer, applyMiddleware(...middleWares));

if (document.getElementById('root')) {
    ReactDOM.render(
        <Provider store={store}>
            <Application/>
        </Provider>,
        document.getElementById('root'));
}