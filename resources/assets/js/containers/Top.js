import {connect} from "react-redux";
import {getReports} from "../actions/index";
import Top from "../components/Top";

const mapStateToProps = state => {
    return {
        reports: state.reports
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getReports: () => dispatch(getReports())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Top);
