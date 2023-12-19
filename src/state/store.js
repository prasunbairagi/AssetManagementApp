import reducers from "./reducers";
import {thunk} from "redux-thunk"
import {applyMiddleware, legacy_createStore} from "redux"

export const store = legacy_createStore(reducers,{},applyMiddleware(thunk))
