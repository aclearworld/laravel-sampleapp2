import React, {Component} from 'react';
import {BrowserRouter as Router, Route,} from "react-router-dom";
import Top from "./containers/Top";
import CustomerList from "./containers/CustomerList";
import CreateNewCustomer from "./containers/CreateNewCustomer";
import EditCustomer from "./containers/EditCustomer";

class Application extends Component {
    render() {
        return (
            <Router>
                <Route exact path="/" component={Top}/>
                {/*<Route path="/login" component={CustomerList}/>*/}
                {/*<Route path="/user" component={CustomerList}/>*/}
                <Route path="/customerList" component={CustomerList}/>
                <Route path="/customer/:id" component={EditCustomer}/>
                <Route path="/addCustomer" component={CreateNewCustomer}/>
            </Router>
        );
    };
}

export default Application;