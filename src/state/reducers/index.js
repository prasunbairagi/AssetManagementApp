import {combineReducers} from "redux";
import qrcodeReducer from "./qrcodeReducer";
import loginStateReducer from "./loginStateReducer";


const reducers = combineReducers({
    qrcode:qrcodeReducer,
    loginState:loginStateReducer
})
export default reducers 