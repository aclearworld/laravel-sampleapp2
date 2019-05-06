import {connect} from "react-redux";
import {getCustomers} from "../actions/index";
import CustomerList from "../components/CustomerList";

const mapStateToProps = state => {
    return {
        customers: state.customers,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getCustomers: () => dispatch(getCustomers()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList);
