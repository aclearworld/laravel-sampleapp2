import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, withRouter, Redirect, Route, Switch} from "react-router-dom";
import Top from "./components/Top";

class Application extends Component {
    render() {
        return (
            <Router>
                <Route exact path="/" component={Top}/>
            </Router>
        );
    };
}

export default Application;