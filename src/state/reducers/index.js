import {combineReducers} from "redux";
import qrcodeReducer from "./qrcodeReducer";
import loginStateReducer from "./loginStateReducer";
import userNameReducer from "./userNameReducer";
const reducers = combineReducers({
    qrcode:qrcodeReducer,
    loginState:loginStateReducer,
    userName:userNameReducer
})
export default reducers 