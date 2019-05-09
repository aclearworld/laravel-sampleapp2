import {connect} from "react-redux";
import {createNewCustomer} from "../actions/index";
import CreateNewCustomer from "../components/CreateNewCustomer";

const mapStateToProps = state => {
    return {
        apiResult: state.apiResult,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createNewCustomer: name => dispatch(createNewCustomer(name)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewCustomer);
