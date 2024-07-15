import { combineReducers } from "redux";
import NoticeReducer from "./NoticeReducer";
import AuthReducer from "./AuthReducer";
import BoardsReducer from "./BoardsReducer";


const RootReducer = combineReducers({

    notices : NoticeReducer,
    auth: AuthReducer,
    board: BoardsReducer,

})

export default RootReducer;