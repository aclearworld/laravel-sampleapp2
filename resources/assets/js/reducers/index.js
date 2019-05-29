import {combineReducers} from "redux";
import {reports} from "./reports";
import {customers} from "./customer";
import {apiResult} from "./apiResult";
import {editingCustomer} from './editingCustomer'

export default combineReducers({
    reports,
    customers,
    apiResult,
    editingCustomer,
})
