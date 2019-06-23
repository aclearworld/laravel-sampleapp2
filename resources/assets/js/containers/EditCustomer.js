import {connect} from "react-redux";
import {getCustomer} from "../actions/index";
import EditCustomer from "../components/EditCustomer";

const mapStateToProps = state => {
    return {
        apiResult: state.apiResult,
        editingCustomer: state.editingCustomer,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getCustomer: id => dispatch(getCustomer(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCustomer);
