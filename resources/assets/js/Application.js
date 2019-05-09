import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, withRouter, Redirect, Route, Switch} from "react-router-dom";
import Top from "./containers/Top";
import CustomerList from "./containers/CustomerList";
import CreateNewCustomer from "./containers/CreateNewCustomer";

class Application extends Component {
    render() {
        return (
            <Router>
                <Route exact path="/" component={Top}/>
                <Route path="/customerList" component={CustomerList}/>
                <Route path="/addCustomer" component={CreateNewCustomer}/>
            </Router>
        );
    };
}

export default Application;