import {connect} from "react-redux";
import {getReports, getCustomers} from "../actions/index";
import {getUser, login, logout} from "../actions/authActions";
import Top from "../components/Top";

const mapStateToProps = state => {
    const displayItems = [];
    const reports = state.reports;
    const customers = state.customers;

    if (reports.length !== 0 && customers.length !== 0) {
        displayItems.push([]);
        reports.forEach(report => {
            let newItem = {};
            newItem.customer = customers.find(customer => {
                return customer.id === report.customer_id;
            });
            newItem.report = report;
            if (displayItems.slice(-1)[0].length === 0) {
                displayItems.slice(-1)[0].push(newItem);
            } else {
                let befor = displayItems.slice(-1)[0][0];
                if (befor.report.visit_date === report.visit_date) {
                    displayItems.slice(-1)[0].push(newItem);
                } else {
                    displayItems.push([newItem]);
                }
            }
        });
    }

    return {
        displayItems: displayItems,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getReports: () => dispatch(getReports()),
        getCustomers: () => dispatch(getCustomers()),
        logout: () => dispatch(logout()),
        login: () => dispatch(login()),
        getUser: () => dispatch(getUser()),
        // getAuthToken: () => dispatch(getAuthToken()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Top);
