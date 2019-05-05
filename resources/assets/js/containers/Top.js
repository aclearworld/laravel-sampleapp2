import {connect} from "react-redux";
import {getReports, getCustomers} from "../actions/index";
import Top from "../components/Top";

const mapStateToProps = state => {
    return {
        reports: state.reports,
        customers: state.customers,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getReports: () => dispatch(getReports()),
        getCustomers: () => dispatch(getCustomers()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Top);
