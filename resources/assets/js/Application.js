import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, withRouter, Redirect, Route, Switch} from "react-router-dom";
import Top from "./containers/Top";
import CustomerList from "./containers/CustomerList";
import Button from "@material-ui/core/Button";

class Application extends Component {
    render() {
        return (
            <Router>
                <Route exact path="/" component={Top}/>
                <Route path="/customerList" component={CustomerList}/>
            </Router>
        );
    };
}

export default Application;