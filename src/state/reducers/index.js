import {combineReducers} from "redux";
import qrcodeReducer from "./qrcodeReducer";
import loginStateReducer from "./loginStateReducer";
import userNameReducer from "./userNameReducer";
import assetFormReducer from "./assetFormReducer";

const reducers = combineReducers({
    qrcode:qrcodeReducer,
    loginState:loginStateReducer,
    userName:userNameReducer,
    assetForm:assetFormReducer
})
export default reducers 