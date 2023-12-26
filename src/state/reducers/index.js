import {combineReducers} from "redux";
import qrcodeReducer from "./qrcodeReducer";

const reducers = combineReducers({
    qrcode:qrcodeReducer,
})
export default reducers 