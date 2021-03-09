import {combineReducers} from "redux";

import {User} from "./User"; 

const rootReducer = combineReducers(
    {
        userState: User
    }
);

export default rootReducer;