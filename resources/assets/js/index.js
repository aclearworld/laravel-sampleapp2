import React from 'react';
import ReactDOM from 'react-dom';
// import {createStore, applyMiddleware} from 'redux';
// import thunk from 'redux-thunk';
// import {Provider} from 'react-redux';

// import rootReducer from "./reducers/index";
// import './index.css';
import Application from './Application';

// const middleWares = [thunk];
// const store = createStore(rootReducer, applyMiddleware(...middleWares));

if (document.getElementById('root')) {
    ReactDOM.render(<Application />, document.getElementById('root'));
}