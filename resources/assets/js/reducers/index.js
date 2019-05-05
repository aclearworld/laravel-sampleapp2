import {combineReducers} from "redux";
import {reports} from "./reports";
import {customers} from "./customer";

export default combineReducers({
    reports,
    customers,
})
